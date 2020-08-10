import React, {createContext, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {withRouter} from "react-router-dom";

import errorHandler from "../utils/error-handler";
import successHandler from "../utils/sucess-handler";
import deckStore from '../store/deck.store';

export const DeckFormContext = createContext({});

const DeckFormProvider = ({children, history, match}) => {
    const dispatch = useDispatch();
    const deck = useSelector((state) => deckStore.selectors.decks(state).find(d => d.id === match?.params?.id));

    const [deckName, setDeckName] = useState('');
    const [deckCards, setDeckCards] = useState([]);
    const [submitted, setSubmitted] = useState(false);

    const cardsMap = useMemo(() => {
        if (deck) {
            return new Map(deck.cards.map(c => [c.name, c]));
        }

        return new Map();
    }, [deck]);

    const updateDeckName = (name) => {
        setDeckName(name);
    };

    const updateDeckCards = () => {
        setDeckCards([...cardsMap.values()]);
    }

    const addCard = (card) => {
        const currentCard = cardsMap.get(card.name);

        if (currentCard?.count === 4) return;

        if (currentCard && currentCard.count < 4) {
            cardsMap.set(card.name, {...currentCard, count: currentCard.count + 1});
        } else {
            cardsMap.set(card.name, {...card, count: 1});
        }

        updateDeckCards();
    };

    const removeCard = (card) => {
        const currentCard = cardsMap.get(card.name);

        if (currentCard && currentCard.count > 1) {
            cardsMap.set(card.name, {...currentCard, count: currentCard.count - 1});
        } else {
            cardsMap.delete(card.name);
        }

        updateDeckCards();
    };

    const validateDeckName = () => {
        return !!(deckName);
    };

    const validateCardsLimit = (min = 24, max = 60) => {
        const total = deckCards.reduce((acc, card) => acc + card.count, 0);

        return total >= min && total <= max;
    }

    const saveDeck = () => {
        const validation = [validateDeckName(), validateCardsLimit()];

        setSubmitted(true);

        if (validation.every(v => v)) {
            const body = {
                id: deck?.id || Math.random().toString(36).substr(2, 9),
                name: deckName,
                cards: deckCards
            };

            dispatch(deckStore.actions.addDeck({deck: body}));

            history.push('/deck/list');

            successHandler('Deck salvo com sucesso');
        } else {
            const [invalidName] = validation;
            errorHandler(
                !invalidName
                    ? 'Você precisa dar um nome ao baralho.'
                    : 'Seu baralho precisa ter no mínimo 24 e no máximo 60 cartas.'
            );
        }
    };

    useEffect(() => {
        if (deck) {
            setDeckName(deck.name);
            setDeckCards(deck.cards);
        }
    }, [deck]);

    return (
        <DeckFormContext.Provider
            value={{
                deckName,
                deckCards,
                updateDeckName,
                addCard,
                removeCard,
                saveDeck,
                submitted
            }}
        >
            {children}
        </DeckFormContext.Provider>
    );
}

export default withRouter(DeckFormProvider);
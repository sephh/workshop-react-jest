import React, {createContext, useMemo, useState} from 'react';
import errorHandler from "../utils/error-handler";
import successHandler from "../utils/sucess-handler";

export const DeckContext = createContext({user: null});

const DeckProvider = ({children}) => {
    const [deckName, setDeckName] = useState('');
    const [deckCards, setDeckCards] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const cardsMap = useMemo(() => new Map(), []);

    const updateDeckName = (name) => {
        setDeckName(name);
    };

    const updateDeckCards = () => {
        console.log([...cardsMap.values()]);
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

    return (
        <DeckContext.Provider
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
        </DeckContext.Provider>
    );
}

export default DeckProvider;
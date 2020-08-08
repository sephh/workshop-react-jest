import React, {useEffect, useMemo} from 'react';
import View from "../layout/View";
import Wrapper from "../layout/Wrapper";
import {useSelector} from "react-redux";
import deckStore from "../store/deck.store";
import PokemonType from "../components/PokemonType";
import PokemonCard from "../components/PokemonCard/PokemonCard";

const DeckDetailsView = ({match, history}) => {
    const deck = useSelector((state) => deckStore.selectors.decks(state).find(d => d.id === match?.params?.id));

    const pokemonTypes = useMemo(() => {
        if (deck) {
            const types = deck.cards
                .map(d => d.types)
                .filter(v => v)
                .flat();

            return [...new Set(types)];
        }
        return [];
    }, [deck]);

    const cardTypes = useMemo(() => {
        if (deck) {
            const supertypesMap = deck.cards
                .reduce((acc, card) => {
                    const supertype = card.supertype;

                    if (acc[supertype]) {
                        return {
                            ...acc,
                            [supertype]: [...acc[supertype], card]
                        };
                    }

                    return {
                        ...acc,
                        [supertype]: [card]
                    };
                }, {});

            const supertypes = [];

            for (let supertype in supertypesMap) {
                supertypes.push({
                    name: supertype,
                    count: supertypesMap[supertype].reduce((acc, card) => acc + card.count, 0),
                    cards: supertypesMap[supertype]
                })
            }

            return supertypes;
        }

        return [];
    }, [deck]);

    const renderSupertypes = () => {
        return cardTypes.map(s => (
            <div className='col-md-6 mb-5' key={s.name}>
                <h4>{s.name}: {s.count} cartas</h4>

                <div className='card-grid card-grid--mini'>
                    {
                        s.cards.map(c => <PokemonCard key={c.id} {...c}/>)
                    }
                </div>
            </div>
        ));
    }

    useEffect(() => {
        if (!deck) {
            history.push('/deck/list');
        }
    }, [deck, history]);

    return (
        <Wrapper>
            <View>

                <div className='deck-details'>

                    <header className='deck-details__header'>
                        <h1 className='text-primary'>{deck?.name}</h1>
                    </header>

                    <div className='deck-details__types mb-5'>
                        {
                            pokemonTypes.map(t =>
                                <span className='mr-2' key={t}>
                                    <PokemonType
                                        type={t}
                                    />
                                </span>
                            )
                        }
                    </div>

                    <div className='deck-details__supertypes'>
                        <div className='row'>
                            {renderSupertypes()}
                        </div>
                    </div>

                </div>

            </View>
        </Wrapper>
    );
};

export default DeckDetailsView;
import {cardBuilder} from "./card-builder";

export const deckBuilder = (props = {}) => {
    return {
        id: Math.random().toString(36).substr(2, 9),
        name: 'Picles',
        cards: [
            cardBuilder(), // Pikachu
            cardBuilder({name: 'Squirtle', types: ['Water']}),
            cardBuilder({name: 'Bulbasaur', types: ['Grass']}),
            cardBuilder({name: 'Charmander', types: ['Fire']}),
        ],
        ...props
    }
};
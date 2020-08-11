import {deckBuilder} from "./deck-builder";
import {arrayToObject, getArrayIds} from "./utils";

export const deckStateBuilder = (props = {}) => {
    const decks = [deckBuilder({name: 'Deck 1'}), deckBuilder({name: 'Deck 2'})];

    return {
        decks: arrayToObject(decks),
        ids: getArrayIds(decks)
    }
};
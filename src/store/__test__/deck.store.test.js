import {combineReducers, createStore} from "redux";
import {deckStateBuilder} from "../../__mocks__/deck-state-builder";

import deckStore from '../deck.store';
import {deckBuilder} from "../../__mocks__/deck-builder";

describe('Deck Store', () => {
    let store;
    let initialState;

    beforeEach(() => {
        initialState = deckStateBuilder();

        store = createStore(
            combineReducers(
                {deck: deckStore.reducer}
            ),
            {
                deck: initialState
            }
        );
    });

    test('should dispatch fetchDecks', () => {
        const deck1 = deckBuilder({name: 'Picles 1'});
        const deck2 = deckBuilder({name: 'Picles 2'});

        store.dispatch(deckStore.actions.fetchDecks({decks: [deck1, deck2]}));

        const currentState = store.getState();

        expect(currentState.deck).toEqual({
            ids: [deck1.id, deck2.id],
            decks: {
                [deck1.id]: deck1,
                [deck2.id]: deck2,
            }
        });
    });

    test('should dispatch addDeck', () => {
        const deck = deckBuilder({name: 'Picles 1'});

        store.dispatch(deckStore.actions.addDeck({deck}));

        const currentState = store.getState();

        expect(currentState.deck).toEqual({
            ids: [...initialState.ids, deck.id],
            decks: {
                ...initialState.decks,
                [deck.id]: deck,
            }
        });
    });

    test('should dispatch removeDeck', () => {
        const [id, id2] = initialState.ids;

        store.dispatch(deckStore.actions.removeDeck({id}));

        const currentState = store.getState();

        expect(currentState.deck.ids).not.toContain(id);
        expect(currentState.deck.decks[id]).not.toBeTruthy();
        expect(currentState.deck.ids).toContain(id2);
        expect(currentState.deck.decks[id2]).toBeTruthy();
    });

    test('should select decks', () => {
        const decks = deckStore.selectors.decks({deck: initialState});

        expect(decks).toEqual(initialState.ids.map(id => initialState.decks[id]));
    });
});
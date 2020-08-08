import {createSelector} from 'reselect';
import {createActions, handleActions} from 'redux-actions';
import {orderBy} from 'lodash';

const defaultState = {
    decks: {},
    ids: [],
}

/** ACTIONS */

const actionsCreator = createActions({

    DECK: {
        FETCH_DECKS: ({decks}) => {
            if (!decks || !decks.length) return {decks: [], ids: []};

            return {
                decks: decks.reduce((acc, deck) => ({...acc, [deck.id]: deck}), {}),
                ids: decks.map(c => c.id)
            };
        },
        ADD_DECK: ({deck}) => {
            if (!deck) return;
            return {deck, id: deck.id};
        },
        REMOVE_DECK: ({id}) => {
            return {id};
        }
    }

})

const {
    fetchDecks,
    addDeck,
    removeDeck,
} = actionsCreator.deck;

const actions = {
    fetchDecks,
    addDeck,
    removeDeck,
};

/** SELECTORS */

const decks = createSelector(
    state => state.deck,
    decksState => orderBy(
        decksState.ids
            .map(id => decksState.decks[id]),
        ['name']
    )
);

const selectors = {
    decks
}

/** REDUCER */

const reducer = handleActions(
    {
        [fetchDecks]: (state, {payload: {decks, ids}}) => {
            return {
                ...state,
                ids,
                decks
            }
        },
        [addDeck]: (state, {payload: {deck, id}}) => {
            const {decks: stateDecks, ids: stateIds} = state;
            return {
                ...state,
                ids: [...new Set([...stateIds, id])],
                decks: {
                    ...stateDecks,
                    [id]: deck
                }
            }
        },
        [removeDeck]: (state, {payload: {id}}) => {
            const {decks: stateDecks, ids: stateIds} = state;

            delete stateDecks[id];

            return {
                ...state,
                ids: stateIds.filter(v => v !== id),
                decks: {
                    ...stateDecks,
                }
            }
        },
    },
    defaultState
)

export default {
    actions,
    reducer,
    selectors
}
import {createSelector} from 'reselect';
import {createActions, handleActions} from 'redux-actions';
import {orderBy} from 'lodash';
import * as CardApi from "../api/card.api";

const defaultState = {
    cards: {},
    ids: [],
    loading: false,
    page: 1,
    query: null
}

/** ACTIONS */

const actionsCreator = createActions({

    CARD: {
        SET_LOADING: ({loading}) => {
            return {loading}
        },
        SET_QUERY: ({query}) => {
            return {query};
        },
        SET_PAGE: ({page}) => {
            return ({page});
        },
        FETCH_CARDS: ({cards}) => {
            if (!cards || !cards.length) return {cards: [], ids: []};

            return {
                cards: cards.reduce((acc, card) => ({...acc, [card.id]: card}), {}),
                ids: cards.map(c => c.id)
            };
        }
    }

})

const {
    fetchCards,
    setLoading,
    setPage,
    setQuery,
} = actionsCreator.card;

const actions = {

    getCards: ({query = ''}) => async (dispatch, getState) => {
        const {query: currentQuery} = getState().card;

        if (query === currentQuery) return;

        try {
            dispatch(setLoading({loading: true}));

            const page = 1;
            const {cards} = await CardApi.getCards(page, query);

            dispatch(fetchCards({cards}));
            dispatch(setQuery({query}));
            dispatch(setPage({page}));
            dispatch(setLoading({loading: false}));

            return cards;
        } catch (e) {
            console.log(e)
            dispatch(setLoading({loading: false}))
            throw e;
        }
    },

    nextCards: () => async (dispatch, getState) => {
        const {query, cards: currentCards, page: currentPage} = getState().card;

        if (!currentPage) return;

        try {
            dispatch(setLoading({loading: true}));

            const page = currentPage + 1;
            const {cards} = await CardApi.getCards(page, query);

            dispatch(fetchCards({cards: [...new Set([...Object.values(currentCards), ...cards])]}));
            dispatch(setPage({page}));
            dispatch(setLoading({loading: false}));

            return cards;
        } catch (e) {
            console.log(e);
            dispatch(setLoading({loading: false}))
            throw e;
        }
    },

    setLoading

};

/** SELECTORS */

const cards = createSelector(
    state => state.card,
    cardsState => orderBy(
        cardsState.ids
            .map(id => cardsState.cards[id]),
        ['name']
    )
)

const loading = createSelector(
    state => state.card,
    cardsState => cardsState.loading,
)

const selectors = {
    cards,
    loading
}

/** REDUCER */

const reducer = handleActions(
    {
        [fetchCards]: (state, {payload: {cards, ids}}) => {
            return {
                ...state,
                ids,
                cards
            }
        },
        [setLoading]: (state, {payload: {loading}}) => {
            return {
                ...state,
                loading
            }
        },
        [setPage]: (state, {payload: {page}}) => {
            return {
                ...state,
                page
            }
        },
        [setQuery]: (state, {payload: {query}}) => {
            return {
                ...state,
                query
            }
        }
    },
    defaultState
)

export default {
    actions,
    reducer,
    selectors
}
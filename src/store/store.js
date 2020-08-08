import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import cardStore from './card.store';
import deckStore from './deck.store';

export default createStore(
    combineReducers({
        card: cardStore.reducer,
        deck: deckStore.reducer
    }),
    applyMiddleware(thunk)
);
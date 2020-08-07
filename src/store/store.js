import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import cardStore from './card.store';

export default createStore(
    combineReducers({
        card: cardStore.reducer,
    }),
    applyMiddleware(thunk)
);
import {applyMiddleware, combineReducers, createStore} from "redux";
import cardStore from "../store/card.store";
import deckStore from "../store/deck.store";
import thunk from "redux-thunk";

export const storeBuilder = (initialState) => {
    return createStore(
        combineReducers({
            card: cardStore.reducer,
            deck: deckStore.reducer
        }),
        initialState,
        applyMiddleware(thunk)
    );
};
# Redux

Redux não faz parte do React, mas é uma lib muito comum nesse contexto, então vamos abordar os teste com redux.

Antes de testar nosso reducer vamos criar o mock do axios, que é usado para buscar os dados que utilizaremos.

```
import axiosMock from 'axios';

jest.mock('axios');

axiosMock.create = () => axiosMock;

export default axiosMock;
```

Agora o teste do `card.store.js`:

```
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import {orderBy} from 'lodash';

import axiosMock from '../../__mocks__/axios-mock';
import cardStore from '../card.store';
import {cardStateBuilder} from "../../__mocks__/card-state-builder";
import {cardBuilder} from "../../__mocks__/card-builder";

describe('Card Store', () => {
    let store;
    let initialCardsState;

    beforeEach(() => {
        jest.clearAllMocks();

        initialCardsState = cardStateBuilder();

        store = createStore(
            combineReducers(
                {
                    card: cardStore.reducer
                }
            ),
            {
                card: initialCardsState
            },
            applyMiddleware(thunk)
        );
    });

    test('should have correct initial state', () => {
        expect(store.getState()).toEqual({card: cardStateBuilder()});
    });

    test('should dispatch getCards', async () => {
        const card = cardBuilder();
        axiosMock.get.mockResolvedValueOnce({
            data: {
                cards: [card]
            }
        });

        await store.dispatch(cardStore.actions.getCards({query: ''}));

        const currentState = store.getState();

        expect(axiosMock.get).toBeCalledTimes(1);
        expect(axiosMock.get).toBeCalledWith('/cards?page=1&name=&pageSize=27');
        expect(currentState.card).toEqual({
            ...initialCardsState,
            cards: {[card.id]: card},
            ids: [card.id],
            query: ''
        });
    });

    test('should dispatch nextCards', async () => {
        const card = cardBuilder({name: 'PokePicles'});
        const query = 'picles';

        store.dispatch(cardStore.actions.setQuery({query}));

        axiosMock.get.mockResolvedValueOnce({
            data: {
                cards: [card]
            }
        });

        await store.dispatch(cardStore.actions.nextCards());

        const currentState = store.getState();

        expect(axiosMock.get).toBeCalledTimes(1);
        expect(axiosMock.get).toBeCalledWith(`/cards?page=2&name=${query}&pageSize=27`);
        expect(currentState.card).toEqual({
            ...initialCardsState,
            query,
            page: 2,
            cards: {...initialCardsState.cards, [card.id]: card},
            ids: [...initialCardsState.ids, card.id]
        });
    });

    test('should dispatch setPage', () => {
        const page = 2020;

        store.dispatch(cardStore.actions.setPage({page}));

        const currentState = store.getState();

        expect(currentState.card.page).toBe(page);
    });

    test('should dispatch setQuery', () => {
        const query = 'picles';

        store.dispatch(cardStore.actions.setQuery({query}));

        const currentState = store.getState();

        expect(currentState.card.query).toBe(query);
    });

    test('should dispatch setLoading', () => {
        const loading = true;

        store.dispatch(cardStore.actions.setLoading({loading}));

        const currentState = store.getState();

        expect(currentState.card.loading).toBe(loading);
    });

    test('should select cards', () => {
        const cards = cardStore.selectors.cards({card: initialCardsState});

        expect(cards).toEqual(
            orderBy(
                Object.values(initialCardsState.cards),
                ['name']
            )
        );
    });

    test('should select loading', () => {
        const loading = cardStore.selectors.loading({card: initialCardsState});

        expect(loading).toBe(false);
    });
});
```

#### Component com redux

Agora vamos testar o component `DeckAddView` que usa o redux.

```
import React from "react";
import {fireEvent, render, wait} from "@testing-library/react";
import {Provider} from "react-redux";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {MemoryRouter, Route} from "react-router-dom";
import thunk from "redux-thunk";
import axiosMock from '../../__mocks__/axios-mock';

import DeckAddView from "../DeckAddView";
import cardStore from "../../store/card.store";
import deckStore from "../../store/deck.store";
import {pikachuMock, squirtleMock} from "../../__mocks__/card-builder";

jest.useFakeTimers();

const setup = () => {
    jest.clearAllMocks();

    const store = createStore(
        combineReducers({
            card: cardStore.reducer,
            deck: deckStore.reducer
        }),
        applyMiddleware(thunk)
    );

    const renderResult = render(<Provider store={store}>
        <MemoryRouter>
            <Route path={'/'} component={DeckAddView}/>
        </MemoryRouter>
    </Provider>);

    return {
        ...renderResult,
        store,
        input: renderResult.getByPlaceholderText('Pesquise...'),
        btnAdd: renderResult.getByText('Salvar Baralho')
    }
};

describe('DeckAddView', () => {
    const mockCardsResponse = (cards = []) => {
        axiosMock.get.mockResolvedValue({
            data: {
                cards
            }
        });
    };

    test('should render with default props', async () => {
        mockCardsResponse();

        const {container, input, btnAdd} = setup();

        await wait(undefined, {timeout: 0});

        expect(container).toBeInTheDocument();
        expect(input).toBeInTheDocument();
        expect(btnAdd).toBeInTheDocument();
    });

    test('should render cards', async () => {
        const cards = [pikachuMock, squirtleMock];

        mockCardsResponse(cards);

        const {getByAltText} = setup();

        await wait(undefined, {timeout: 0});

        cards.forEach(card => {
            expect(getByAltText(`${card.id}-${card.name}`)).toBeInTheDocument();
        });
    });

    test('should render loading', () => {
        mockCardsResponse();

        const {getByAltText, store} = setup();

        store.dispatch(cardStore.actions.setLoading({loading: true}));

        expect(getByAltText('Pokeball Loading')).toBeInTheDocument();
    });

    test('should render empty result', async () => {
        mockCardsResponse();

        const {getByAltText} = setup();

        await wait(undefined, {timeout: 0});

        expect(getByAltText('Empty Result')).toBeInTheDocument();
    });

    test('should search', async () => {
        mockCardsResponse();

        const {input} = setup();

        fireEvent.change(input, {target: {value: 'picles'}});

        jest.runAllTimers();

        expect(axiosMock.get).toBeCalledTimes(2);
        expect(axiosMock.get).toBeCalledWith('/cards?page=1&name=picles&pageSize=27');
    });
});
```
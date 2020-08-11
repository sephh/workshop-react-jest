import React from "react";
import {fireEvent, render, wait} from "@testing-library/react";
import {Provider} from "react-redux";
import {MemoryRouter, Route} from "react-router-dom";
import axiosMock from '../../__mocks__/axios-mock';

import DeckAddView from "../DeckAddView";
import cardStore from "../../store/card.store";
import {pikachuMock, squirtleMock} from "../../__mocks__/card-builder";
import {storeBuilder} from "../../__mocks__/store-builder";

jest.useFakeTimers();

const setup = () => {
    jest.clearAllMocks();

    const store = storeBuilder();

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
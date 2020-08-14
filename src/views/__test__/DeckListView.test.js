import React from "react";
import {fireEvent, render, wait} from "@testing-library/react";
import DeckListView from "../DeckListView";
import {Provider} from "react-redux";
import {MemoryRouter, Route} from "react-router-dom";
import {storeBuilder} from "../../__mocks__/store-builder";
import {deckBuilder} from "../../__mocks__/deck-builder";
import {arrayToObject, getArrayIds} from "../../__mocks__/utils";

const DummyComponent = () => <div>Add Deck Screen</div>;

jest.useFakeTimers();

const setup = (props = {}) => {
    const decks = [
        deckBuilder({name: 'picles'}),
        deckBuilder({name: 'gincobiloba'}),
    ];

    const initialState = {
        deck: {
            ids: getArrayIds(decks),
            decks: arrayToObject(decks)
        }
    };

    const store = storeBuilder(initialState);

    const renderResult = render(<Provider store={store}>
            <MemoryRouter>
                <Route path={'/'} component={DeckListView}/>
                <Route path={'/deck/new'} component={DummyComponent}/>
            </MemoryRouter>
        </Provider>);

    return {
        ...renderResult,
        decks,
        btnAdd: renderResult.getByText('Novo baralho'),
        input: renderResult.getByPlaceholderText('Pesquise...'),
    }
};

describe('DeckListView', () => {
    test('should render with default props', () => {
        const {container, decks, getByText} = setup();

        expect(container).toBeInTheDocument();

        decks.forEach((deck) => {
            expect(getByText(deck.name)).toBeInTheDocument();
        });
    });

    test('should filter decks', () => {
        const {input, queryByText} = setup();

        fireEvent.change(input, {target: {value: 'picles'}});

        jest.runAllTimers();

        expect(queryByText('picles')).toBeInTheDocument();
        expect(queryByText('gincobiloba')).not.toBeInTheDocument();
    });

    test('should go to add deck', () => {
        const {btnAdd, getByText} = setup();

        btnAdd.click();

        expect(getByText('Add Deck Screen')).toBeInTheDocument();
    });
});

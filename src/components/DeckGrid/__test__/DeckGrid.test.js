import React from "react";
import {render, wait} from "@testing-library/react";
import DeckGrid from "../DeckGrid";
import {MemoryRouter, Route} from "react-router-dom";
import {storeBuilder} from "../../../__mocks__/store-builder";
import {deckBuilder} from "../../../__mocks__/deck-builder";
import {Provider} from "react-redux";
import {arrayToObject, getArrayIds} from "../../../__mocks__/utils";
import deckStore from '../../../store/deck.store';

const DummyComponnet = ({match, name}) => {
    return (<div>{name} {match?.params?.id}</div>)
}

const setup = (props = {
    decks: []
}) => {
    const initialState = {
        deck: {
            ids: getArrayIds(props.decks),
            decks: arrayToObject(props.decks)
        }
    };

    const store = storeBuilder(initialState);
    const renderResult = render(
        <MemoryRouter>
            <Provider store={store}>

                <Route exact={true} path={'/'} component={() => <DeckGrid {...props} />}/>
                <Route exact={true} path={'/deck/edit/:id'}
                       component={(props) => <DummyComponnet {...props} name={'Edit'}/>}/>
                <Route exact={true} path={'/deck/details/:id'}
                       component={(props) => <DummyComponnet {...props} name={'Detail'}/>}/>

            </Provider>
        </MemoryRouter>
    );

    return {
        ...renderResult,
        decks: props.decks,
        store
    }
}

describe('DeckGrid', () => {
    test('should render with default props', () => {
        const {container, getByText} = setup();

        expect(container).toBeInTheDocument();
        expect(getByText('Oops... Não encontramos nada.')).toBeInTheDocument();
    });

    test('should render decks', () => {
        const decks = [
            deckBuilder({name: 'Deck 1'}),
            deckBuilder({name: 'Deck 2'}),
        ];

        const {getByText} = setup({decks});

        decks.forEach((deck) => {
            expect(getByText(deck.name)).toBeInTheDocument();
        });
    });

    test('should navigate to edit', () => {
        const deck = deckBuilder({name: 'Deck 1'});
        const decks = [deck];

        const {getByTitle, getByText} = setup({decks});
        const dummyText = `Edit ${deck.id}`;

        const btnEdit = getByTitle('Editar');
        btnEdit.click();

        expect(getByText(dummyText)).toBeInTheDocument();
    });

    test('should navigate to details', () => {
        const deck = deckBuilder({name: 'Deck 1'});
        const decks = [deck];

        const {getByAltText, getByText} = setup({decks});
        const dummyText = `Detail ${deck.id}`;

        const deckImage = getByAltText(`${deck.id}-${deck.name}`);
        deckImage.click();

        expect(getByText(dummyText)).toBeInTheDocument();
    });

    test('should remove deck', async () => {
        const deck = deckBuilder({name: 'Deck 1'});
        const decks = [deck];

        const {getByTitle, store} = setup({decks});

        let currentState = store.getState();

        let currentDecks = deckStore.selectors.decks(currentState);

        expect(currentDecks.length).toBe(1);


        const btnRemove = getByTitle('Remover');
        btnRemove.click();

        currentState = store.getState();

        currentDecks = deckStore.selectors.decks(currentState);

        expect(currentDecks.length).toBe(0);
    });
});

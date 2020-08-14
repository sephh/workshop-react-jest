import React from "react";
import {render} from "@testing-library/react";
import {Provider} from "react-redux";
import {MemoryRouter, Route} from "react-router-dom";
import DeckDetailsView from "../DeckDetailsView";
import {storeBuilder} from "../../__mocks__/store-builder";
import {deckBuilder} from "../../__mocks__/deck-builder";
import {arrayToObject, getArrayIds} from "../../__mocks__/utils";

const setup = () => {
    const deck = deckBuilder();

    const initialState = {
        deck: {
            ids: getArrayIds([deck]),
            decks: arrayToObject([deck])
        }
    };

    const store = storeBuilder(initialState);

    const renderResult = render(
        <MemoryRouter initialEntries={[`/deck/details/${deck.id}`]} initialIndex={0}>
            <Provider store={store}>
                <Route path={'/deck/details/:id'} component={DeckDetailsView}/>
            </Provider>
        </MemoryRouter>
    );

    return {
        ...renderResult,
        deck
    }
}

describe('DeckDetailsView', () => {
    test('should render with default props', () => {
        const {container, getByText, getByAltText, deck} = setup();

        expect(container).toBeInTheDocument();
        expect(getByText(/Pokémon/)).toBeInTheDocument();

        deck.cards.forEach((card)=>{
            expect(getByAltText(`${card.id}-${card.name}`)).toBeInTheDocument();
        })
    });
});

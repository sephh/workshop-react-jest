import React from "react";
import {fireEvent, render} from "@testing-library/react";

import CardGrid from "../CardGrid";
import {bulbasaurMock, pikachuMock} from "../../../__mocks__/card-builder";
import {DeckFormProviderMock, mockedContext} from "../../../__mocks__/deck-form-provider-mock";

const setup = ({cards = [], loading = false}) => {
    const renderResult = render(
        <DeckFormProviderMock>
            <CardGrid cards={cards} loading={loading} />
        </DeckFormProviderMock>
    );

    return {
        ...renderResult,
        ...mockedContext
    }
}

describe('CardGrid', () => {
    test('should render with default props', () => {
        const {container, getByAltText, getByText} = setup({});

        expect(getByAltText('Empty Result')).toBeInTheDocument();
        expect(getByText('Oops... Não encontramos nada.')).toBeInTheDocument();
        expect(container).toBeInTheDocument();
    });

    test('should render cards', () => {
        const cards = [pikachuMock, bulbasaurMock];
        const {getByAltText} = setup({cards});

        cards.forEach((card)=>{
            expect(getByAltText(`${card.id}-${card.name}`)).toBeInTheDocument();
        });
    });

    test('should add card', () => {
        const cards = [pikachuMock, bulbasaurMock];
        const {getByAltText, addCard} = setup({cards});

        const pikachu = getByAltText(`${pikachuMock.id}-${pikachuMock.name}`);

        fireEvent.click(pikachu);

        expect(addCard).toHaveBeenCalledWith(pikachuMock);
    });
});

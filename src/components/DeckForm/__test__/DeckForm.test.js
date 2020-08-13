import React from "react";
import {fireEvent, render} from "@testing-library/react";
import DeckForm from "../DeckForm";
import {DeckFormProviderMock, mockedContext} from "../../../__mocks__/deck-form-provider-mock";
import {deckBuilder} from "../../../__mocks__/deck-builder";
import {cardBuilder} from "../../../__mocks__/card-builder";

const setup = (props = {}) => {
    const renderResult = render(
        <DeckFormProviderMock context={{...mockedContext, ...props}}>
            <DeckForm/>
        </DeckFormProviderMock>
    );

    return {
        ...mockedContext,
        ...renderResult,
        formGroup: renderResult.getByTestId('deck-form'),
        input: renderResult.getByPlaceholderText('Nome do deck'),
    }
}

const wasValidated = (className) => {
    return className.indexOf('was-validated') > -1;
}

describe('DeckForm', () => {
    test('should render with default props', () => {
        const {container, input, formGroup} = setup();

        expect(container).toBeInTheDocument();
        expect(input).toBeInTheDocument();
        expect(wasValidated(formGroup.className)).toBe(false);
    });

    test('should validate deck name', () => {
        const {formGroup} = setup({submitted: true});

        expect(wasValidated(formGroup.className)).toBe(true);
    });

    test('should render cards input', () => {
        const deck = deckBuilder();

        const {getByText} = setup({deckCards: deck.cards});

        deck.cards.forEach((card)=>{
           expect(getByText(card.name)).toBeInTheDocument();
        });
    });

    test('should call addCard', () => {
        const card = cardBuilder();
        const deck = deckBuilder({cards: [card]});

        const {getByText, addCard} = setup({deckCards: deck.cards});

        const btnAdd = getByText('+');
        btnAdd.click();

        expect(addCard).toHaveBeenCalledWith(card);
    });

    test('should call removeCard', () => {
        const card = cardBuilder();
        const deck = deckBuilder({cards: [card]});

        const {getByText, removeCard} = setup({deckCards: deck.cards});

        const btnRemove = getByText('-');
        btnRemove.click();

        expect(removeCard).toHaveBeenCalledWith(card);
    });

    test('should call updateDeckName', () => {
        const {input, updateDeckName} = setup();
        const event = {target:{value: 'picles'}};

        fireEvent.change(input, event);

        expect(updateDeckName).toBeCalledWith(event.target.value);
    });
});

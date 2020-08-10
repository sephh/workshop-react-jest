import React from "react";
import {render} from "@testing-library/react";
import Deck from "../Deck";
import {deckBuilder} from "../../../__mocks__/deck-builder";

const setup = (props = {}) => {
    const defaultDeck = props?.deck || deckBuilder();
    const renderResult = render(<Deck {...{...props, ...defaultDeck}} />);

    return {
        image: renderResult.getByAltText(`${defaultDeck.id}-${defaultDeck.name}`),
        deckNameElement: renderResult.getByText(defaultDeck.name),
        btnEdit: renderResult.getByTitle('Editar'),
        btnRemove: renderResult.getByTitle('Remover'),
        defaultDeck,
        ...renderResult
    }
}

describe('Deck', () => {
    test('should render with default props', () => {
        const {container, image, deckNameElement, btnEdit, btnRemove} = setup();

        expect(container).toBeInTheDocument();
        expect(image).toBeInTheDocument();
        expect(deckNameElement).toBeInTheDocument();
        expect(btnEdit).toBeInTheDocument();
        expect(btnRemove).toBeInTheDocument();
    });

    test('should emit onClick event', () => {
        const onClick = jest.fn();
        const {image} = setup({onClick});

        image.click();

        expect(onClick).toHaveBeenCalledTimes(1);
    });

    test('should emit onRemove event', () => {
        const onRemove = jest.fn();
        const {btnRemove} = setup({onRemove});

        btnRemove.click();

        expect(onRemove).toHaveBeenCalledTimes(1);
    });

    test('shoud emit onEdit event', () => {
        const onEdit = jest.fn();
        const {btnEdit} = setup({onEdit});

        btnEdit.click();

        expect(onEdit).toHaveBeenCalledTimes(1);
    });
});

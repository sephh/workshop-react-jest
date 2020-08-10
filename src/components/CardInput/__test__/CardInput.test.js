import React from "react";
import {render} from "@testing-library/react";
import CardInput from "../CardInput";
import {cardBuilder} from "../../../__mocks__/card-builder";

const setup = (props = {}) => {
    const defaultCard = cardBuilder();
    const card = props?.card || defaultCard;
    const renderResult = render(<CardInput card={card} {...props} />);

    return {
        card,
        defaultCard,
        countElement: renderResult.getByText(card.count.toString()),
        nameElement: renderResult.getByText(card.name),
        btnRemove: renderResult.getByText('-'),
        btnAdd: renderResult.getByText('+'),
        ...renderResult
    }
}

describe('CardInput', () => {
    test('should render with default props', () => {
        const {container} = setup();

        expect(container).toBeInTheDocument();
    });

    test('should render correct name', () => {
        const card = cardBuilder({name: 'Squirtle'});
        const {nameElement, defaultCard, queryByText} = setup({card});

        expect(queryByText(defaultCard.name)).not.toBeInTheDocument();
        expect(nameElement).toBeInTheDocument();
    });

    test('should render correct count', () => {
        const card = cardBuilder({count: 3});
        const {countElement, defaultCard, queryByText} = setup({card});

        expect(queryByText(defaultCard.count.toString())).not.toBeInTheDocument();
        expect(countElement).toBeInTheDocument();
    });

    test('should emit onAdd event', () => {
        const onAdd = jest.fn();
        const {btnAdd} = setup({onAdd});

        btnAdd.click();

        expect(onAdd).toHaveBeenCalledTimes(1);
    });

    test('should emit onRemove event', () => {
        const onRemove = jest.fn();
        const {btnRemove} = setup({onRemove});

        btnRemove.click();

        expect(onRemove).toHaveBeenCalledTimes(1);
    });
});

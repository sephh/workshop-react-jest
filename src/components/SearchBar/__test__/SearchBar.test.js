import React from "react";
import {fireEvent, render} from "@testing-library/react";
import SearchBar from "../SearchBar";

const setup = (props = {}) => {
    const renderResult = render(<SearchBar {...props}/>);

    return {
        input: renderResult.getByPlaceholderText('Pesquise...'),
        button: renderResult.getByText('Botão'),
        defaultInputDelay: 200,
        ...renderResult
    };
};

jest.useFakeTimers();

describe('SearchBar', () => {
    test('should render with default props', () => {
        const {container, input, button} = setup();

        expect(container).toBeInTheDocument();
        expect(input).toBeInTheDocument();
        expect(button).toBeInTheDocument();
    });

    test('input should emit onChange event', () => {
        const onChange = jest.fn();
        const {input, defaultInputDelay} = setup({onChange});

        fireEvent.change(input, {target: {value: 'Picles'}});

        jest.runTimersToTime(defaultInputDelay);

        expect(onChange).toHaveBeenCalled();
        expect(onChange).toHaveBeenCalledWith({target: input});
    });

    test('button should emit onButtonClick event', () => {
        const onButtonClick = jest.fn();
        const {button} = setup({onButtonClick});

        button.click();

        expect(onButtonClick).toHaveBeenCalledTimes(1);
    });
});
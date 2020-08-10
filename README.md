# Eventos do Usuário

Vamos testar agora a interação do usuário com o component.

Primeiro vamos fazer um teste com um evento simples de click no component `PokemonCard`;

```
import React from "react";
import {render} from "@testing-library/react";

import PokemonCard from "../PokemonCard";
import {cardBuilder} from "../../../__mocks__/card-builder";

describe('PokemonCard', () => {
    let card;

    beforeEach(() => {
        card = cardBuilder();
    });

    test('should render with default props', ()=>{
        const {container, getByAltText} = render(<PokemonCard {...card}/>);
        const imageAlt = `${card.id}-${card.name}`;

        const image = getByAltText(imageAlt);

        expect(container).toBeInTheDocument();
        expect(image.src).toBe(card.imageUrl);
        expect(image.alt).toBe(imageAlt);
    });

    test('should emit event onClick', () => {
        const onClick = jest.fn();
        const {getByAltText} = render(<PokemonCard {...card} onClick={onClick}/>);
        const imageAlt = `${card.id}-${card.name}`;

        const image = getByAltText(imageAlt);
        image.click();

        expect(onClick).toHaveBeenCalledTimes(1);
    });
});
```

#### fireEvent

O `fireEvent` é uma feature do `@testing-library/react` que nos auxilia nos testes de evento mais complexo.

Vamos testar o component `SearchBar` para exemplificar.

```
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
```
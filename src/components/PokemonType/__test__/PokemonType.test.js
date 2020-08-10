import React from "react";
import {render} from "@testing-library/react";
import PokemonType, {pokemonTypes} from "../PokemonType";

const setup = (props = {}) => {
    const defaultType = 'colorless';
    const renderResult = render(<PokemonType type={defaultType} {...props} />);

    return {
        defaultSize: 32,
        image: renderResult.getByAltText(props?.type || defaultType),
        defaultType,
        ...renderResult
    }
}

describe('PokemonType', () => {
    test('should render with default props', () => {
        const {container, image, defaultSize, defaultType} = setup();

        expect(container).toBeInTheDocument();
        expect(image).toBeInTheDocument();
        expect(image.width).toBe(defaultSize);
        expect(image.height).toBe(defaultSize);
        expect(image.src).toBe('http://localhost/' + pokemonTypes[defaultType]);
    });

    test('should render with correct size', () => {
        const size = 50;
        const {image} = setup({size});

        expect(image.width).toBe(size);
        expect(image.height).toBe(size);
    });

    test('should render correct type', () => {
        const type = 'fire';
        const {image, rerender} = setup({type});

        expect(image.src).toBe('http://localhost/' + pokemonTypes[type]);

        rerender(<PokemonType type={'Picles'}/>);

        expect(image.src).toBe('');
    });
});

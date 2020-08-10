import React from "react";
import {render} from "@testing-library/react";
import PokeballLoading from "../PokeballLoading";

describe('PokeballLoading', () => {
    test('should render with default props', ()=>{
        const {container, getByAltText} = render(<PokeballLoading/>);

        const image = getByAltText(/Pokeball Loading/i);

        expect(container).toBeInTheDocument();
        expect(image).toBeInTheDocument();
        expect(image.width).toBe(200);
    });

    test('message should change', () => {
        const {queryByText, rerender} = render(<PokeballLoading/>);
        const message = 'Nova mensagem';

        expect(queryByText(message)).not.toBeInTheDocument();

        rerender(<PokeballLoading message={message}/>);

        expect(queryByText(message)).toBeInTheDocument();
    });

    test('image should have correct size', () => {
        const size = 100;
        const {getByAltText} = render(<PokeballLoading size={size}/>);

        const image = getByAltText(/Pokeball Loading/i);

        expect(image.width).toBe(size);
        expect(image.height).toBe(size);
    });
});

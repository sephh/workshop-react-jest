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
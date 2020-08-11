import {bulbasaurMock, charmanderMock, pikachuMock, squirtleMock} from "./card-builder";
import {arrayToObject, getArrayIds} from "./utils";

export const cardStateBuilder = (props = {}) => {
    const defaultPokemons = [pikachuMock, squirtleMock, bulbasaurMock, charmanderMock];

    return {
        cards: arrayToObject(defaultPokemons),
        ids: getArrayIds(defaultPokemons),
        loading: false,
        page: 1,
        query: null,
        ...props
    }
};

import {bulbasaurMock, charmanderMock, pikachuMock, squirtleMock} from "./card-builder";

export const deckBuilder = (props = {}) => {
    return {
        id: Math.random().toString(36).substr(2, 9),
        name: 'Picles',
        cards: [
            pikachuMock,
            squirtleMock,
            bulbasaurMock,
            charmanderMock
        ],
        ...props
    }
};
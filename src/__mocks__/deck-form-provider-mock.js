import {DeckFormContext} from "../providers/DeckFormProvider";
import React from "react";

export const mockedContext = {
    deckName: '',
    deckCards: [],
    updateDeckName: jest.fn(),
    addCard: jest.fn(),
    removeCard: jest.fn(),
    saveDeck: jest.fn(),
    submitted: false
};

export const DeckFormProviderMock = ({children, context = mockedContext}) => {
    return <DeckFormContext.Provider value={context}>
        {children}
    </DeckFormContext.Provider>
}
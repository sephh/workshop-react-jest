# Context Api

Existe pouca documentação sobre esse tipo de teste, mas vamos seguir na filosofia que adotamos até agora e vamos testar nosso DeckFormProvider.

```
import React, {useContext} from 'react'
import {fireEvent, render, wait} from "@testing-library/react";
import {Provider} from "react-redux";
import {MemoryRouter, Route} from "react-router-dom";

import {storeBuilder} from "../../__mocks__/store-builder";
import DeckFormProvider, {DeckFormContext} from "../DeckFormProvider";
import {cardBuilder, pikachuMock} from "../../__mocks__/card-builder";
import {arrayToObject, getArrayIds} from "../../__mocks__/utils";
import {deckBuilder} from "../../__mocks__/deck-builder";
import errorHandler from "../../utils/error-handler";
import successHandler from "../../utils/sucess-handler";

jest.mock('../../utils/error-handler');
jest.mock('../../utils/sucess-handler');

const DeckFormTestComponent = ({card}) => {
    const {deckName, deckCards, updateDeckName, addCard, removeCard, saveDeck, submitted} = useContext(DeckFormContext);
    return (
        <>
            <div>{deckName}</div>
            <div>Was submitted: {submitted}</div>
            <input onChange={(evt) => updateDeckName(evt.target.value)} placeholder={'Update input'}/>
            <button onClick={() => addCard(card)}>Add</button>
            <button onClick={() => removeCard(card)}>Remove</button>
            <button onClick={saveDeck}>Save</button>
            {
                deckCards.map(c => (<div key={c.id}>{c.count} {c.name}</div>))
            }
        </>
    );
};

const clickTimes = (button, times) => {
    [...new Array(times)].forEach(() => {
        button.click();
    })
}

const setup = (initialState, deckId) => {
    const store = storeBuilder(initialState);
    const card = pikachuMock;

    const testRenderer = render(
        <Provider store={store}>
            <MemoryRouter initialEntries={[`/deck/${deckId}`]} initialIndex={0}>
                <Route path={'/deck/:id'} exact={true} component={() =>
                    <DeckFormProvider>
                        <DeckFormTestComponent card={card}/>
                    </DeckFormProvider>
                }/>
            </MemoryRouter>
        </Provider>
    );


    return {
        ...testRenderer,
        card,
        btnAdd: testRenderer.getByText('Add'),
        btnRemove: testRenderer.getByText('Remove'),
        btnSave: testRenderer.getByText('Save'),
        input: testRenderer.getByPlaceholderText('Update input'),
    };
};

describe('DeckFormProvider', () => {
    afterEach(()=>{
        jest.clearAllMocks();
    });

    test('should render with default props', () => {
        const {container} = setup();
        expect(container).toBeInTheDocument();
    });

    test('should add correctly', () => {
        const {btnAdd, getByText, card} = setup();
        const twoTimes = 2;

        clickTimes(btnAdd, twoTimes);

        const twoTimesElement = getByText(`${twoTimes} ${card.name}`);

        expect(twoTimesElement).toBeInTheDocument();

        clickTimes(btnAdd, 10);

        const timesLimitElement = getByText(`${4} ${card.name}`);

        expect(timesLimitElement).toBeInTheDocument();
    });

    test('should remove correctly', async () => {
        const initialCount = 4;

        const deck = deckBuilder({
            cards: [{...pikachuMock, count: 4}]
        });

        const initialState = {
            deck: {
                decks: arrayToObject([deck]),
                ids: getArrayIds([deck])
            }
        };

        const {btnRemove, getByText, queryByText, card} = setup(initialState, deck.id);

        await wait(undefined, {timeout: 0});

        const once = 1;

        clickTimes(btnRemove, once);

        const onceElement = getByText(`${initialCount - once} ${card.name}`);

        expect(onceElement).toBeInTheDocument();

        clickTimes(btnRemove, 10);

        const timesLimitElement = queryByText(`${card.name}`);

        expect(timesLimitElement).not.toBeInTheDocument();
    });

    test('should set name', () => {
        const {getByText, input} = setup();
        const deckName = 'Meu deck';

        fireEvent.change(input, {target: {value: deckName}});

        expect(getByText(deckName)).toBeInTheDocument();
    });

    test('should not save', async () => {
        const {btnSave, input} = setup();

        fireEvent.click(btnSave);

        expect(errorHandler).toHaveBeenCalledWith('Você precisa dar um nome ao baralho.');

        const deckName = 'Meu deck';

        fireEvent.change(input, {target: {value: deckName}});

        fireEvent.click(btnSave);

        expect(errorHandler).toHaveBeenCalledWith('Seu baralho precisa ter no mínimo 24 e no máximo 60 cartas.');
    });

    test('should save', () => {
        const deck = deckBuilder({
            cards: [
                cardBuilder({name: 'Picle 1', count: 4}),
                cardBuilder({name: 'Picle 2', count: 4}),
                cardBuilder({name: 'Picle 3', count: 4}),
                cardBuilder({name: 'Picle 4', count: 4}),
                cardBuilder({name: 'Picle 5', count: 4}),
                cardBuilder({name: 'Picle 6', count: 4}),
            ]
        });

        const initialState = {
            deck: {
                decks: arrayToObject([deck]),
                ids: getArrayIds([deck])
            }
        };

        const {btnSave} = setup(initialState, deck.id);

        fireEvent.click(btnSave);

        expect(successHandler).toHaveBeenCalledWith('Deck salvo com sucesso');
    });
});
```

Agora que testamos nosso contexto, vamos testar um component que o utiliza, o `CardGrid`.

```
import React from "react";
import {fireEvent, render} from "@testing-library/react";

import CardGrid from "../CardGrid";
import {bulbasaurMock, pikachuMock} from "../../../__mocks__/card-builder";
import {DeckFormProviderMock, mockedContext} from "../../../__mocks__/deck-form-provider-mock";

const setup = ({cards = [], loading = false}) => {
    const renderResult = render(
        <DeckFormProviderMock>
            <CardGrid cards={cards} loading={loading} />
        </DeckFormProviderMock>
    );

    return {
        ...renderResult,
        ...mockedContext
    }
}

describe('CardGrid', () => {
    test('should render with default props', () => {
        const {container, getByAltText, getByText} = setup({});

        expect(getByAltText('Empty Result')).toBeInTheDocument();
        expect(getByText('Oops... Não encontramos nada.')).toBeInTheDocument();
        expect(container).toBeInTheDocument();
    });

    test('should render cards', () => {
        const cards = [pikachuMock, bulbasaurMock];
        const {getByAltText} = setup({cards});

        cards.forEach((card)=>{
            expect(getByAltText(`${card.id}-${card.name}`)).toBeInTheDocument();
        });
    });

    test('should add card', () => {
        const cards = [pikachuMock, bulbasaurMock];
        const {getByAltText, addCard} = setup({cards});

        const pikachu = getByAltText(`${pikachuMock.id}-${pikachuMock.name}`);

        fireEvent.click(pikachu);

        expect(addCard).toHaveBeenCalledWith(pikachuMock);
    });
});
```
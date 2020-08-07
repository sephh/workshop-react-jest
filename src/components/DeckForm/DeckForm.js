import React, {useContext, useState,} from 'react';
import cx from 'classnames';
import {DeckContext} from "../../providers/DeckProvider";
import CardInput from "../CardInput";

const DeckForm = () => {
    const {submitted, deckName, deckCards, updateDeckName, addCard, removeCard} = useContext(DeckContext);

    const [validated, setValidated] = useState(false);

    const setName = ({target: {value}}) => {
        updateDeckName(value);
        setValidated( true);
    }

    return (
        <div className='row'>
            <div className='col-md-12'>
                <div className={
                    cx('form-group mb-2', {'was-validated': submitted || validated})
                }>
                    <label htmlFor="deckName" className="sr-only">Nome do deck</label>
                    <input
                        className="form-control form-control-lg"
                        id="deckName"
                        placeholder='Nome do deck'
                        value={deckName}
                        onChange={setName}
                        required
                    />
                    <div className="invalid-feedback">
                        O nome é obrigatório
                    </div>
                </div>
            </div>

            <div className='col-md-12'>
                {
                    deckCards.map((card) =>
                        <CardInput
                            key={card.id}
                            onAdd={() => addCard(card)}
                            onRemove={() => removeCard(card)}
                            card={card}
                        />
                    )
                }
            </div>
        </div>
    );
};

export default DeckForm;
import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from "react-router-dom";
import {useDispatch} from "react-redux";

import EmptyResult from "../EmptyResult/EmptyResult";
import Deck from "../Deck";
import deckStore from "../../store/deck.store";

const DeckGrid = ({decks, history}) => {
    const dispatch = useDispatch();

    const editDeck = (id) => {
        history.push(`/deck/edit/${id}`);
    };

    const removeDeck = (id) => {
        dispatch(deckStore.actions.removeDeck({id}));
    };

    const goToDetails = (id) => {
        history.push(`/deck/details/${id}`);
    };

    const renderHandler = () => {
        if (!decks || !decks.length) {
            return <EmptyResult/>;
        }

        return (
            <div className='card-grid'>
                {
                    decks.map(deck =>
                        <Deck
                            key={deck.id}
                            onEdit={() => editDeck(deck.id)}
                            onClick={() => goToDetails(deck.id)}
                            onRemove={() => removeDeck(deck.id)}
                            {...deck}
                        />
                    )
                }
            </div>
        )
    }

    return renderHandler();
};

DeckGrid.propTypes = {
    decks: PropTypes.array
};

export default withRouter(DeckGrid);
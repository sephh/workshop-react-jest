import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import PokeballLoading from "../PokeballLoading.js";
import EmptyResult from "../EmptyResult/EmptyResult";
import PokemonCard from "../PokemonCard/PokemonCard";
import DeckForm from "../DeckForm";
import {DeckFormContext} from "../../providers/DeckFormProvider";

const CardGrid = ({cards, loading}) => {
    const {addCard} = useContext(DeckFormContext);

    const renderHandle = () => {
        const noCards = !cards || !cards.length;

        if (loading) {
            return <PokeballLoading/>;
        }

        if (noCards) {
            return <EmptyResult/>;
        }

        return (
            <div className='card-grid'>
                {
                    cards.map(card =>
                        <PokemonCard
                            key={card.id}
                            onClick={() => addCard(card)}
                            {...card}
                        />
                    )
                }
            </div>
        )
    };

    return (
        <div className='row'>
            <div className='col-md-9'>
                {renderHandle()}
            </div>

            <div className='col-md-3'>
                <DeckForm/>
            </div>
        </div>
    );
};

CardGrid.propTypes = {
    cards: PropTypes.array
};

CardGrid.defaultProps = {
    cards: []
};

export default CardGrid;
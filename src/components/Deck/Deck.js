import React from 'react';
import PropTypes from 'prop-types';

import deckBack from '../../assets/images/deck_back.png';

const Deck = ({id, name, onClick, onRemove, onEdit}) => {
    return (
        <div className='deck'>
            <img
                className='fade-in'
                style={styles.deck}
                src={deckBack}
                alt={`${id}-${name}`}
                width={'100%'}
                loading={'lazy'}
                onClick={onClick}
            />

            <div className='deck__name'>
                {name}
            </div>

            <div className='deck__controllers'>
                <button
                    className='btn btn-sm btn-light mr-2'
                    onClick={onRemove}
                >
                    <span className="far fa-trash-alt text-danger"/>
                </button>

                <button
                    className='btn btn-sm btn-light'
                    onClick={onEdit}
                >
                    <span className="fas fa-pencil-alt text-primary"/>
                </button>
            </div>
        </div>
    );
};

Deck.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    onClick: PropTypes.func,
    onRemove: PropTypes.func,
    onEdit: PropTypes.func,
};

Deck.defaultProps = {
    onClick: () => {},
    onRemove: () => {},
    onEdit: () => {},
}

const styles = {
    deck: {
        objectFit: 'contain',
        cursor: 'pointer',
        transition: 'all 0.3s',
    }
}

export default Deck;
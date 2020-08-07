import React from 'react';
import PropTypes from 'prop-types';

const CardInput = ({card, onAdd, onRemove}) => {
    return (
        <div className='card-input'>
            <span className='card-input__count'>{card?.count}</span>
            <span className='card-input__name'>{card?.name}</span>
            <button
                className='btn btn-sm btn-danger mr-2'
                onClick={onRemove}
            >
                -
            </button>

            <button
                className='btn btn-sm btn-primary'
                onClick={onAdd}
            >
                +
            </button>
        </div>
    );
};

CardInput.propTypes = {
    card: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        count: PropTypes.number
    }),
    onAdd: PropTypes.func,
    onRemove: PropTypes.func,
};

CardInput.defaultProps = {
    onAdd: () => {},
    onRemove: () => {},
}

export default CardInput;
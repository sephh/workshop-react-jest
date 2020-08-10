import React from 'react';
import PropTypes from 'prop-types';

import pokeball from './pokeball.gif';

const PokeballLoading = ({message = '', size = 200}) => {
    const handleMessage = () => message
        ? (<span className="pokeball-loading__message text-primary">
                {message}
            </span>)
        : null;

    return (
        <div className="pokeball-loading">
            <div className="pokeball-loading__image">
                <img src={pokeball} alt={'Pokeball Loading'} width={size} height={size}/>
            </div>
            {handleMessage()}
        </div>
    );
};

PokeballLoading.propTypes = {
    message: PropTypes.string,
    size: PropTypes.number
};

export default PokeballLoading;
import React, {useCallback} from 'react';
import PropTypes from 'prop-types';

import pokeball from './pokeball.gif';

const PokeballLoading = ({message = '', size = 200}) => {
    const handleMessage = useCallback(
        () => message
            ? (<span className="pokeball-loading__message text-primary">
                {message}
            </span>)
            : null,
        [message]
    );

    return (
        <div className="pokeball-loading">
            <div className="pokeball-loading__image">
                <img src={pokeball} alt={'Pokeball Loading'} width={size}/>
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
import React from 'react';
import PropTypes from 'prop-types';

import psyduck from '../../assets/images/psyduck.webp';

const EmptyResult = ({message, width}) => {
    return (
        <div className='empty-result'>
            <img className='empty-result__image' width={width} src={psyduck} alt={'Empty Result'}/>

            <span className='empty-result__message text-muted'>{message}</span>
        </div>
    );
};

EmptyResult.propTypes = {
    message: PropTypes.string,
    width: PropTypes.number,
};

EmptyResult.defaultProps = {
    message: 'Oops... Não encontramos nada.',
    width: 200,
}

export default EmptyResult;
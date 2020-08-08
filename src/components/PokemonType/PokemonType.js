import React from 'react';
import PropTypes from 'prop-types';

import colorless from '../../assets/images/colorless.png';
import darkness from '../../assets/images/darkness.png';
import dragon from '../../assets/images/dragon.png';
import fairy from '../../assets/images/fairy.png';
import fighting from '../../assets/images/fighting.png';
import fire from '../../assets/images/fire.png';
import grass from '../../assets/images/grass.png';
import lightning from '../../assets/images/lightning.png';
import metal from '../../assets/images/metal.png';
import psychic from '../../assets/images/psychic.png';
import water from '../../assets/images/water.png';

const types = {
    colorless,
    darkness,
    dragon,
    fairy,
    fighting,
    fire,
    grass,
    lightning,
    metal,
    psychic,
    water,
};

const PokemonType = ({type, size}) => {
    return (
        <img
            src={types[type.toLowerCase()]}
            alt={type}
            width={size}
            height={size}
        />
    );
};

PokemonType.propTypes = {
    type: PropTypes.string,
    size: PropTypes.number
};

PokemonType.defaultProps = {
    size: 32
}

export default PokemonType;
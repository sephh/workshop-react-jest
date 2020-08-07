import React from 'react';
import PropTypes from 'prop-types';

let timeout;

const SearchBar = ({placeholder, buttonLabel, inputDelay, onChange, onButtonClick}) => {
    const onChangeDebounce = (evt) => {
        timeout && clearTimeout(timeout);
        const target = evt.target;
        timeout = setTimeout(() => onChange({target}), inputDelay);
    };

    return (
        <div className="row mb-3">
            <div className='col-md-9'>
                <div className="form-group mb-2">
                    <label htmlFor="search-input" className="sr-only">{placeholder}</label>
                    <input
                        className="form-control form-control-lg"
                        id="search-input"
                        placeholder={placeholder}
                        onChange={onChangeDebounce}
                    />
                </div>
            </div>

            <div className='col-md-3'>
                <button
                    className="btn btn-lg btn-block btn-primary mb-2 text-nowrap"
                    onClick={onButtonClick}
                >
                    {buttonLabel}
                </button>
            </div>
        </div>
    );
};

SearchBar.propTypes = {
    placeholder: PropTypes.string,
    buttonLabel: PropTypes.string,
    inputDelay: PropTypes.number, // milliseconds
    onChange: PropTypes.func,
    onButtonClick: PropTypes.func
};

SearchBar.defaultProps = {
    placeholder: 'Pesquise...',
    inputDelay: 200,
    onChange: () => {
    },
    onButtonClick: () => {
    }
}

export default SearchBar;
import React from 'react';
import logo from '../assets/images/logo.svg'
import {Link} from "react-router-dom";

const HeaderApp = () => {
    return (
        <header className='header-app shadow-sm'>
            <div className='header-app__item header-app__item--left'/>
            <div className='header-app__item header-app__item--right'/>
            <Link to={'/'}>
                <img
                    className='header-app__logo'
                    alt='header logo'
                    src={logo}
                />
            </Link>

        </header>
    );
};

export default HeaderApp;
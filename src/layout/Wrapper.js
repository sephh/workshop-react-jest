import React from 'react';
import HeaderApp from "./HeaderApp";

const Wrapper = ({children}) => {
    return (
        <div className='wrapper'>
            <HeaderApp/>
            <div className='container'>
                {children}
            </div>
        </div>
    );
};

export default Wrapper;
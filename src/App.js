import React from 'react';
import Router from "./router";
import {Provider} from "react-redux";
import {ToastContainer} from 'react-toastify';

import store from "./store";

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <Router/>
            </Provider>

            <ToastContainer/>
        </div>
    );
}

export default App;

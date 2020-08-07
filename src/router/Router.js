import React, { Fragment, Suspense } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import routes from "./routes";
import PokeballLoading from "../components/PokeballLoading.js";

const deckRoutes = routes();

const Router = () => {
    return (
        <BrowserRouter>
            <Fragment>

                <Suspense fallback={
                    <div className='router-loading-container'>
                        <PokeballLoading/>
                    </div>
                }>
                    <Switch>

                        {deckRoutes.map((route) => (
                            <Route
                                key={route.path}
                                path={route.path}
                                component={route.component}
                                exact={route.exact}
                            />
                        ))}

                        <Redirect to='/deck/list'/>

                    </Switch>
                </Suspense>

            </Fragment>
        </BrowserRouter>
    );
};

export default Router;

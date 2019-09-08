import React, { FC } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import {HomeScreen} from './screens/home-screen'


const App: FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route component={HomeScreen}/>
            </Switch>
        </BrowserRouter>
    )
}

export { App };
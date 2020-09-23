import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import HomeComponent from './HomeComponent';
function MainComponent(props) {
    return (
            <Switch>
                <Route path="/home" component={() => <HomeComponent />} />
                <Redirect to="/home" />
            </Switch>
    );
}

export default MainComponent;
import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import Home from "./Home";
import Report from "./Report";
import Nav from "./Nav";

import '../../style/main.css';

const Root = () => {
    return (
        <Router>
            <div className="App">
                <Nav />
                <Switch>
                    <Route component={Home} exact path="/" />
                    <Route component={Report} exact path="/reports/week" />
                    <Route component={Report} path="/reports/week/:reportNr" />
                </Switch>
            </div>
        </Router>
    )
};

export default Root;

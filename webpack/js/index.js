import React, {Suspense} from "react";
import ReactDOM from "react-dom";
import "../scss/lab-portal.scss"
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import {superLazy} from "./components/superLazy";
import {ChordsQueueContextProvider} from "./components/context";
import Placeholder from "./components/presentation/Placeholder";

const MainPage = superLazy(() => import('./components/container/MainPage'));

ReactDOM.render(
    <Router>
        <Suspense fallback={<Placeholder/>}>
            <Switch>
                <Route exact path="/login">
                    <Redirect to={"/"}/>
                </Route>
                <Route exact path="/">
                    <MainPage/>
                </Route>
            </Switch>
        </Suspense>
    </Router>,
    document.getElementById("root")
);
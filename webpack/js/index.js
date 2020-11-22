import React, {Suspense} from "react";
import ReactDOM from "react-dom";
import "../scss/lab-portal.scss"
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import {superLazy} from "./components/superLazy";
import {LoggedInContextProvider} from "./components/context";
import Placeholder from "./components/presentation/Placeholder";

const Login = superLazy(() => import('./components/container/Login'));

ReactDOM.render(
    <Router>
        <Suspense fallback={<Placeholder/>}>
            <Switch>
                <Route exact path="/login">
                    <Redirect to={"/"}/>
                </Route>
                <Route exact path="/">
                    <LoggedInContextProvider>
                        <Login/>
                    </LoggedInContextProvider>
                </Route>
            </Switch>
        </Suspense>
    </Router>,
    document.getElementById("root")
);
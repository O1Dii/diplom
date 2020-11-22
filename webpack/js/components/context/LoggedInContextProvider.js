import React, {useReducer} from 'react';
import combineReducers from "react-combine-reducers";
import {Grid} from "react-flexbox-grid";

const [rootReducerCombined, initialStateCombined] = combineReducers({
    // login: [Reducers.loginReducer, Reducers.loginInitialState],
    // userDrawer: [Reducers.userDrawerReducer, Reducers.userDrawerInitialState],
    // userList: [Reducers.userListReducer, Reducers.userListInitialState],
    // appsList: [Reducers.appsListReducer, Reducers.appsListInitialState],
    // appsDrawer: [Reducers.appsDrawerReducer, Reducers.appsDrawerInitialState],
    // labsList: [Reducers.labsListReducer, Reducers.labsListInitialState],
    // labsDrawer: [Reducers.labsDrawerReducer, Reducers.labsDrawerInitialState],
    // rolesList: [Reducers.rolesListReducer, Reducers.rolesListInitialState],
    // rolesDrawer: [Reducers.rolesDrawerReducer, Reducers.rolesDrawerInitialState],
    // epgt: [Reducers.epgtReducer, Reducers.epgtInitialState],
    // gseq: [Reducers.gseqReducer, Reducers.gseqInitialState],
    // labsPopup: [Reducers.labsPopupReducer, Reducers.labsPopupInitialState]
});

export const LoggedInContext = React.createContext(initialStateCombined);

export function LoggedInContextProvider(props) {
    const [state, dispatch] = useReducer(rootReducerCombined, initialStateCombined);

    return (
        <LoggedInContext.Provider value={{...state, dispatch}}>
            <Grid fluid>
                {props.children}
            </Grid>
        </LoggedInContext.Provider>
    )
}
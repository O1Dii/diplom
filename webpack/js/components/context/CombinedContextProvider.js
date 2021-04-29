import React, {useReducer} from 'react';
import {chordsQueueReducer, chordsQueueInitialState} from "../../reducers";
import combineReducers from "react-combine-reducers";
import {notesInitialState, notesReducer} from "../../reducers/Notes";

const [rootReducerCombined, initialStateCombined] = combineReducers({
    chordsQueue: [chordsQueueReducer, chordsQueueInitialState],
    notes: [notesReducer, notesInitialState]
})

export const CombinedContext = React.createContext(initialStateCombined);

export function CombinedContextProvider(props) {
    const [state, dispatch] = useReducer(rootReducerCombined, initialStateCombined);

    return (
        <CombinedContext.Provider value={{...state, dispatch}}>
            {props.children}
        </CombinedContext.Provider>
    )
}
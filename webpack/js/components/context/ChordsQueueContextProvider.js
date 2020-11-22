import React, {useReducer} from 'react';
import {chordsQueueReducer, chordsQueueInitialState} from "../../reducers/ChordsQueue";

export const ChordsQueueContext = React.createContext(chordsQueueInitialState);

export function ChordsQueueContextProvider(props) {
    const [state, dispatch] = useReducer(chordsQueueReducer, chordsQueueInitialState);

    return (
        <ChordsQueueContext.Provider value={{...state, dispatch}}>
            {props.children}
        </ChordsQueueContext.Provider>
    )
}
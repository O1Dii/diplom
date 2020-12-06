import React, {useReducer} from 'react';
import {notesReducer, notesInitialState} from "../../reducers/Notes";

export const NotesContext = React.createContext(notesInitialState);

export function NotesContextProvider(props) {
    const [state, dispatch] = useReducer(notesReducer, notesInitialState);

    return (
        <NotesContext.Provider value={{...state, dispatch}}>
            {props.children}
        </NotesContext.Provider>
    )
}
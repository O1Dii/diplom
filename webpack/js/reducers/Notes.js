import {
    NOTES_SET_EVENTS,
    NOTES_SET_CURRENT_EVENTS,
    NOTES_SET_MODE,
    NOTES_SET_CURRENT_TIME,
    NOTES_SET_DEFAULTS
} from "../constants";

export const notesInitialState = {
    mode: 'RECORDING',
    events: [],
    current_time: 0,
    current_events: [],
};

export function notesReducer(state, action) {
    switch (action.type) {
        case NOTES_SET_MODE:
            return {...state, mode: action.payload}
        case NOTES_SET_CURRENT_EVENTS:
            return {...state, current_events: action.payload}
        case NOTES_SET_EVENTS:
            return {...state, events: action.payload}
        case NOTES_SET_CURRENT_TIME:
            return {...state, current_time: action.payload}
        case NOTES_SET_DEFAULTS:
            return {...notesInitialState}
        default:
            return state;
    }
}
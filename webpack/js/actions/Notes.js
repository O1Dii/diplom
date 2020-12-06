import {
    NOTES_SET_CURRENT_EVENTS, NOTES_SET_CURRENT_TIME, NOTES_SET_DEFAULTS, NOTES_SET_EVENTS, NOTES_SET_MODE
} from "../constants";

export function setCurrentTime(time) {
    return {type: NOTES_SET_CURRENT_TIME, payload: time};
}

export function setCurrentEvents(events) {
    return {type: NOTES_SET_CURRENT_EVENTS, payload: events};
}

export function setEvents(events) {
    return {type: NOTES_SET_EVENTS, payload: events};
}

export function setMode(mode) {
    return {type: NOTES_SET_MODE, payload: mode};
}

export function resetNotes() {
    return {type: NOTES_SET_DEFAULTS};
}
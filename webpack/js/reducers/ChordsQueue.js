import {
    CHORD_QUEUE_ADD,
    CHORD_QUEUE_REMOVE
} from "../constants";

export const chordsQueueInitialState = {
    current_chords: [],
    queue_full: false
};

export function chordsQueueReducer(state, action) {
    switch (action.type) {
        case CHORD_QUEUE_ADD:
            if (!state.queue_full) {
                const length = state.current_chords.push(action.payload);

                if (length === 4) {
                    return {...state, queue_full: true}
                }
            }

            return {...state}

        case CHORD_QUEUE_REMOVE:
            state.current_chords.splice(action.payload, 1);
            return {...state, queue_full: false};

        default:
            return state;
    }
}
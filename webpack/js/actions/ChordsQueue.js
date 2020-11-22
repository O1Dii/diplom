import {
    CHORD_QUEUE_ADD,
    CHORD_QUEUE_REMOVE
} from "../constants";

export function addChordToQueue(chord) {
    return {type: CHORD_QUEUE_ADD, payload: chord};
}

export function removeChordFromQueue(index) {
    return {type: CHORD_QUEUE_REMOVE, payload: index};
}
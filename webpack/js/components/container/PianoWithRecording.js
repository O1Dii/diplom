import React, {useContext, useState} from 'react';
import {Piano} from 'react-piano';
import {NotesContext} from "../context";
import {setCurrentTime, setEvents} from "../../actions/Notes";

const DURATION_UNIT = 0.2;
const DEFAULT_NOTE_DURATION = DURATION_UNIT;

const PianoWithRecording = ({playNote, stopNote, recording, setRecording, setNoteRange, ...pianoProps}) => {
    const {mode, current_time, events, current_events, dispatch} = useContext(NotesContext);

    const [notesRecorded, setNotesRecorded] = useState({});
    const [noteDuration, setNoteDuration] = useState(DEFAULT_NOTE_DURATION);

    const onPlayNoteInput = midiNumber => {
        setNotesRecorded(false);
    };

    const recordNotes = (midiNumbers, duration) => {
        if (mode !== 'RECORDING') {
            return;
        }
        const newEvents = midiNumbers.map(midiNumber => {
            return {
                midiNumber,
                time: current_time,
                duration: duration,
            };
        });
        dispatch(setEvents(events.concat(newEvents)));
        dispatch(setCurrentTime(current_time + duration));
    };

    const onStopNoteInput = (midiNumber, {prevActiveNotes}) => {
        if (notesRecorded === false) {
            recordNotes(prevActiveNotes, noteDuration);
            setNotesRecorded(true);
            setNoteDuration(DEFAULT_NOTE_DURATION);
        }
    };

    const activeNotes =
        mode === 'PLAYING' ? current_events.map(event => event.midiNumber) : null;

    return (
        <div className="piano-keyboard">
            <div className="piano-keyboard-buttons-container">
                <button onClick={() => setNoteRange({...pianoProps.noteRange, first: pianoProps.noteRange.first - 1})}
                        className="button">+1
                </button>
                <button onClick={() => setNoteRange({...pianoProps.noteRange, first: pianoProps.noteRange.first + 1})}
                        className="button">-1
                </button>
            </div>
            <Piano
                playNote={playNote}
                stopNote={stopNote}
                onPlayNoteInput={onPlayNoteInput}
                onStopNoteInput={onStopNoteInput}
                activeNotes={activeNotes}
                {...pianoProps}
            />
            <div className="piano-keyboard-buttons-container">
                <button onClick={() => setNoteRange({...pianoProps.noteRange, last: pianoProps.noteRange.last - 1})}
                        className="button">-1
                </button>
                <button onClick={() => setNoteRange({...pianoProps.noteRange, last: pianoProps.noteRange.last + 1})}
                        className="button">+1
                </button>
            </div>
        </div>
    );
}

export default PianoWithRecording;

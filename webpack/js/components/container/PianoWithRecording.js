import React, {useContext, useState} from 'react';
import {Piano} from 'react-piano';
import {NotesContext} from "../context/NotesContextProvider";
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
            <button onClick={() => setNoteRange({...pianoProps.noteRange, first: pianoProps.noteRange.first - 1})}
                    className="piano-keyboard__left-minus">+1
            </button>
            <button onClick={() => setNoteRange({...pianoProps.noteRange, first: pianoProps.noteRange.first + 1})}
                    className="piano-keyboard__left-plus">-1
            </button>
            <Piano
                playNote={playNote}
                stopNote={stopNote}
                onPlayNoteInput={onPlayNoteInput}
                onStopNoteInput={onStopNoteInput}
                activeNotes={activeNotes}
                {...pianoProps}
            />
            <button onClick={() => setNoteRange({...pianoProps.noteRange, last: pianoProps.noteRange.last - 1})}
                    className="piano-keyboard__right-minus">-1
            </button>
            <button onClick={() => setNoteRange({...pianoProps.noteRange, last: pianoProps.noteRange.last + 1})}
                    className="piano-keyboard__right-plus">+1
            </button>
        </div>
    );
}

export default PianoWithRecording;

import React, {useState, useContext} from "react";
import {KeyboardShortcuts, MidiNumbers} from "react-piano";
import 'react-piano/dist/styles.css';
import SoundfontProvider from "./SoundFontProvider";
import {soundfontHostname} from "../../constants";
import PianoWithRecording from "./PianoWithRecording";
import {NotesContext} from "../context/NotesContextProvider";
import _ from 'lodash';
import {setMode, setCurrentEvents, resetNotes} from "../../actions/Notes";

export default function PianoKeyboard({width}) {
    const {events, dispatch} = useContext(NotesContext);
    const [noteRange, setNoteRange] = useState({
        first: MidiNumbers.fromNote('c3'),
        last: MidiNumbers.fromNote('f4'),
    });
    const keyboardShortcuts = KeyboardShortcuts.create({
        firstNote: noteRange.first,
        lastNote: noteRange.last,
        keyboardConfig: KeyboardShortcuts.HOME_ROW,
    });

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const scheduledEvents = [];

    const getRecordingEndTime = () => {
        if (events.length === 0) {
            return 0;
        }

        return Math.max(
            ...events.map(event => event.time + event.duration),
        );
    };

    const onClickPlay = () => {
        const startAndEndTimes = _.uniq(
            _.flatMap(events, event => [
                event.time,
                event.time + event.duration,
            ]),
        );

        startAndEndTimes.forEach(time => {
            scheduledEvents.push(
                setTimeout(() => {
                    const currentEvents = events.filter(event => {
                        return event.time <= time && event.time + event.duration > time;
                    });
                    dispatch(setMode('PLAYING'));
                    dispatch(setCurrentEvents(currentEvents));
                }, time * 1000),
            );
        });

        setTimeout(() => {
            onClickStop();
        }, getRecordingEndTime() * 1000);
    };

    const onClickStop = () => {
        scheduledEvents.forEach(scheduledEvent => {
            clearTimeout(scheduledEvent);
        });
        dispatch(setMode('RECORDING'));
        dispatch(setCurrentEvents([]));
    };

    const onClickClear = () => {
        onClickStop();
        dispatch(resetNotes());
    };

    return (
        <>
            <SoundfontProvider
                instrumentName="acoustic_grand_piano"
                audioContext={audioContext}
                hostname={soundfontHostname}
                render={({isLoading, playNote, stopNote}) => (
                    <PianoWithRecording
                        noteRange={noteRange}
                        setNoteRange={setNoteRange}
                        width={width - 100}
                        playNote={playNote}
                        stopNote={stopNote}
                        disabled={isLoading}
                        keyboardShortcuts={keyboardShortcuts}
                    />
                )}/>
            <button onClick={onClickPlay}>Play</button>
            <button onClick={onClickClear}>Clear</button>
        </>
    );
}
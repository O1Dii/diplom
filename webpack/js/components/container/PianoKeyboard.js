import React, {useContext, useState} from "react";
import {KeyboardShortcuts, MidiNumbers} from "react-piano";
import 'react-piano/dist/styles.css';
import SoundfontProvider from "./SoundFontProvider";
import {soundfontHostname} from "../../constants";
import PianoWithRecording from "./PianoWithRecording";
import _ from 'lodash';
import {resetNotes, setCurrentEvents, setMode} from "../../actions/Notes";
import {getRecordingEndTime} from '../../utils/recording';
import {ChordsQueueContext, NotesContext} from "../context";

export default function PianoKeyboard({width, audioContext}) {
    const {events, mode, dispatch} = useContext(NotesContext);
    const {current_chords, dispatchChords} = useContext(ChordsQueueContext);
    const queue_full = current_chords.length === 4;
    const [noteRange, setNoteRange] = useState({
        first: MidiNumbers.fromNote('c3'),
        last: MidiNumbers.fromNote('f4'),
    });
    const keyboardShortcuts = KeyboardShortcuts.create({
        firstNote: noteRange.first,
        lastNote: noteRange.last,
        keyboardConfig: KeyboardShortcuts.HOME_ROW,
    });

    const recommendations = ['C', 'D', 'Eb', 'E', 'F', 'G', 'Ab', 'A', 'Bb', 'B'];

    const scheduledEvents = [];

    const onClickPlay = () => {
        const startAndEndTimes = _.uniq(
            _.flatMap(events, event => [
                event.time,
                event.time + event.duration,
            ]),
        );

        startAndEndTimes.forEach(time => {
            dispatch(setMode('PLAYING'));

            scheduledEvents.push(
                setTimeout(() => {
                    const currentEvents = events.filter(event => {
                        return event.time <= time && event.time + event.duration > time;
                    });
                    dispatch(setCurrentEvents(currentEvents));
                }, time * 1000),
            );
        });

        setTimeout(() => {
            onClickStop();
        }, getRecordingEndTime(events) * 1000);
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

    console.log(queue_full);

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
                        recommendations={recommendations}
                        disabled={isLoading || !queue_full}
                        keyboardShortcuts={keyboardShortcuts}
                    />
                )}/>
            {mode === 'RECORDING' ?
                <button className="button" onClick={onClickPlay}>Play</button> :
                <button className="button" onClick={onClickStop}>Stop</button>
            }
            <button className="button" disabled={!queue_full} onClick={onClickClear}>Clear</button>
        </>
    );
}
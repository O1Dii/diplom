import React, {useContext} from "react";
import {addChordToQueue} from "../../actions";
import {ChordsQueueContext, NotesContext} from "../context";
import {soundfontHostname} from "../../constants";
import SoundfontProvider from "./SoundFontProvider";
import {setEvents} from "../../actions/Notes";

export default function ChordsCircle({audioContext}) {
    const majorChords = [['F', 53], ['C', 48], ['G', 55], ['D', 50], ['A', 57], ['E', 52], ['B', 59], ['Gb', 54], ['Db', 49], ['Ab', 56], ['Eb', 51], ['Bb', 58]];
    const minorChords = [['D', 50], ['A', 57], ['E', 52], ['B', 59], ['Gb', 54], ['Db', 49], ['Ab', 56], ['Eb', 51], ['Bb', 58], ['F', 53], ['C', 48], ['G', 55]];
    const combinedChords = majorChords.map((item, index) => ({maj: item, min: minorChords[index]}));

    const recommendedMaj = ['Ab', 'Eb', 'Bb', 'F', 'C', 'G'];
    const recommendedMin = ['F', 'C', 'G', 'D', 'A', 'E'];

    const {queue_full, current_chords, dispatch} = useContext(ChordsQueueContext);
    const {events, dispatch: dispatchNotes} = useContext(NotesContext);
    console.log(queue_full);
    console.log(events);

    // const [playMajor] = useSound(`${currentUrl}/sounds/majorChords.mp3`, {sprite: majorSprite});
    // const [playMinor] = useSound(`${currentUrl}/sounds/minorChords.mp3`, {sprite: minorSprite});

    const generateMajorChord = (midiNumber, transposition) => {
        return [midiNumber, midiNumber + 3, midiNumber + 7];
    }
    const generateMinorChord = (midiNumber, transposition) => {
        if (midiNumber === 55) {
            return [midiNumber - 5, midiNumber, midiNumber + 4]
        }
        return [midiNumber, midiNumber + 4, midiNumber + 7];
    }

    const playChord = (playNote, stopNote, notes, duration = 0.4) => {
        const stop = () => {
            for (const note of notes) {
                stopNote(note);
            }
        }

        for (const note of notes) {
            playNote(note);
        }

        setTimeout(stop, duration * 1000);
    }

    const handleChordClick = (playNote, stopNote, major, chord) => {
        let notes = [];
        if (!major) {
            notes = generateMajorChord(chord[1]);

            chord[0] += 'm';
        } else {
            notes = generateMinorChord(chord[1]);
        }

        playChord(playNote, stopNote, notes);

        dispatchNotes(setEvents(events.concat(notes.map(note => ({
            midiNumber: note,
            time: current_chords.length * 0.4,
            duration: 0.4
        })))));
        dispatch(addChordToQueue(chord[0]));
    }

    return (
        <div>

            <SoundfontProvider
                instrumentName="acoustic_grand_piano"
                audioContext={audioContext}
                hostname={soundfontHostname}
                render={({isLoading, playNote, stopNote}) => (
                    <div className="component">
                        <div className="cn-wrapper opened-nav" id="cn-wrapper">
                            <ul id="keys" className="major">
                                {combinedChords.map(item => (
                                    <li key={item.maj} className="key">
                                <span>
                                    <div className="circle-item">
                                        <button disabled={isLoading || queue_full}
                                                className={recommendedMaj.includes(item.maj[0]) ? 'recommended' : ''}
                                                onClick={() => handleChordClick(playNote, stopNote, true, item.maj)}>{item.maj[0]}</button>
                                        {/*{item.maj[0] === 'G' &&*/}
                                        {/*    <button>Gsus</button>}*/}
                                    </div>
                                    <button disabled={isLoading || queue_full}
                                            className={`circle-item__min-button ${recommendedMin.includes(item.min[0]) ? 'recommended' : ''}`}
                                            onClick={() => handleChordClick(playNote, stopNote, false, item.min)}>{item.min[0]}m</button>
                                </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>)}/>
        </div>
    );
}
import React, {useContext} from "react";
import {NotesContext} from "../context";
import PlayHead from "./sequencer/PlayHead";
import PianoKeysSidebar from "./sequencer/PianoKeysSidebar";
import NoteSlot from "./sequencer/NoteSlot";
import {sevenOctavePiano} from "./sequencer/concerns/keyboard";
import _ from 'lodash';
import {getRecordingEndTime} from "../../utils/recording";

export default function SequencerContainer({width}) {
    const {events} = useContext(NotesContext);
    const duration = getRecordingEndTime(events);

    return (
        <div className="sequencer-container">
            <PianoKeysSidebar/>
            <div className="note-slots">
                <PlayHead currentTime={0.33}/>
                {sevenOctavePiano.map((pianoKey, i) => {
                    return (
                        <NoteSlot
                            key={_.uniqueId('note_slot_')}
                            pianoKey={pianoKey}
                            dark={pianoKey.search('#') !== -1}
                            midiNumber={108 - i}
                            duration={duration}
                            notes={events.filter(note => note.midiNumber === (108 - i))}
                        />
                    )
                })}
            </div>
        </div>
    );
};
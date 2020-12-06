import React, {useContext} from "react";
import {NotesContext} from "../context/NotesContextProvider";
import PlayHead from "./sequencer/PlayHead";
import PianoKeysSidebar from "./sequencer/PianoKeysSidebar";
import NoteSlot from "./sequencer/NoteSlot";
import {sevenOctavePiano} from "./sequencer/concerns/keyboard";
import _ from 'lodash';

export default function SequencerContainer({width}) {
    const {events} = useContext(NotesContext);
    console.log(events);

    return (
        <div className="sequencer-container">
            <PianoKeysSidebar/>
            <div className="note-slots">
                <PlayHead/>
                {sevenOctavePiano.map((pianoKey, i) => {
                    return (
                        <NoteSlot
                            key={_.uniqueId('note_slot_')}
                            pianoKey={pianoKey}
                            dark={pianoKey.search('#') !== -1}
                            pitch={108 - i}
                        />
                    )
                })}
            </div>
        </div>
    );
};
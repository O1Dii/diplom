import React, {useContext} from "react";
import {removeChordFromQueue} from "../../actions";
import {ChordsQueueContext, NotesContext} from "../context";
import useSound from "use-sound";
import {currentUrl, majorSprite, minorSprite} from "../../constants";
import {CombinedContext} from "../context/CombinedContextProvider";

export default function ChordsQueue() {
    const {current_chords, dispatch} = useContext(ChordsQueueContext);
    const {events, dispatch: dispatchNotes} = useContext(NotesContext);

    const handleChordRemoveClick = (index) => {
        dispatch(removeChordFromQueue(index));
    }

    return (
        <div className="chords-queue-container">
            <div className="chords-queue">
                {current_chords.map((item, index) => (
                    <div key={index} className="chords-queue__item-container">
                        <div className="chords-queue__item">
                            <div className="chords-queue__transposition-container">
                                <button className="button">-1</button>
                                <p>0</p>
                                <button className="button">+1</button>
                            </div>
                            <div className="chords-queue__chord-name">{item}</div>
                            <button className="chords-queue__delete-button"
                                    onClick={() => handleChordRemoveClick(index)}>X
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
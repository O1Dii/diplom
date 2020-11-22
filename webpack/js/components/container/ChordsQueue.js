import React, {useContext} from "react";
import {removeChordFromQueue} from "../../actions";
import {ChordsQueueContext} from "../context";
import useSound from "use-sound";
import {currentUrl, majorSprite, minorSprite} from "../../constants";

export default function ChordsQueue() {
    const {current_chords, dispatch} = useContext(ChordsQueueContext);

    const [playMajor] = useSound(`${currentUrl}/sounds/majorChords.mp3`, {sprite: majorSprite});
    const [playMinor] = useSound(`${currentUrl}/sounds/minorChords.mp3`, {sprite: minorSprite});

    const handleChordRemoveClick = (index) => {
        dispatch(removeChordFromQueue(index));
    }

    const handlePlayAll = () => {
        let n = 0;
        for (const chord of current_chords) {
            setTimeout(() => {
                if (chord.indexOf('m') !== -1) {
                    const pureChord = chord.replace(/m/, '');
                    playMinor({id: pureChord});
                } else {
                    playMajor({id: chord});
                }
            }, n);
            n += 800;
        }
    }

    return (
        <div className="chords-queue-container">
            <div className="chords-queue">
                {current_chords.map((item, index) => (
                    <div key={index} className="chords-queue__item-container">
                        <div className="chords-queue__item">
                            <div className="chords-queue__chord-name">{item}</div>
                            <button className="chords-queue__delete-button"
                                    onClick={() => handleChordRemoveClick(index)}>X
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <button className="chords-queue__play-all-button" onClick={handlePlayAll}>
                Play all
            </button>
        </div>
    );
}
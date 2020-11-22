import React, {useContext} from "react";
import {addChordToQueue} from "../../actions";
import {ChordsQueueContext} from "../context";
import useSound from "use-sound";
import {currentUrl, majorSprite, minorSprite} from "../../constants";

export default function ChordsCircle() {
    const majorChords = ['F', 'C', 'G', 'D', 'A', 'E', 'B', 'Gb', 'Db', 'Ab', 'Eb', 'Bb'];
    const minorChords = ['D', 'A', 'E', 'B', 'Gb', 'Db', 'Ab', 'Eb', 'Bb', 'F', 'C', 'G'];
    const combinedChords = majorChords.map((item, index) => ({maj: item, min: minorChords[index]}));

    const recommendedMaj = ['C', 'G', 'F'];
    const recommendedMin = ['D', 'A', 'E'];

    const {queue_full, dispatch} = useContext(ChordsQueueContext);

    const [playMajor] = useSound(`${currentUrl}/sounds/majorChords.mp3`, {sprite: majorSprite});
    const [playMinor] = useSound(`${currentUrl}/sounds/minorChords.mp3`, {sprite: minorSprite});

    const handleChordClick = (major, chord) => {
        if (!major) {
            playMinor({id: chord});

            chord += 'm';
        } else {
            playMajor({id: chord});
        }

        dispatch(addChordToQueue(chord));
    }

    return (
        <div>
            <div className="component">
                <div className="cn-wrapper opened-nav" id="cn-wrapper">
                    <ul id="keys" className="major">
                        {combinedChords.map(item => (
                            <li key={item.maj} className="key">
                                <span>
                                    <button disabled={queue_full} className={recommendedMaj.includes(item.maj) && 'recommended'} onClick={() => handleChordClick(true, item.maj)}>{item.maj}</button>
                                    <button disabled={queue_full} className={recommendedMin.includes(item.min) && 'recommended'} onClick={() => handleChordClick(false, item.min)}>{item.min}m</button>
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
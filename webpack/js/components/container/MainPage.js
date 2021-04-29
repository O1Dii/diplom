import React from "react";
import ChordsCircle from "./ChordsCircle";
import ChordsQueue from "./ChordsQueue";
import PianoKeyboard from "./PianoKeyboard";
import SequencerContainer from "./SequencerContainer";
import useCurrentWidth from "../../utils/useCurrentWidth";
import {ChordsQueueContextProvider, NotesContextProvider} from "../context";
import {CombinedContextProvider} from "../context/CombinedContextProvider";
import ExportButtons from "./ExportButtons";

export default function MainPage() {
    const getWidth = () => {
        return window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;
    }

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    const width = useCurrentWidth(getWidth);

    return (
        <div className="main-page">
            <ChordsQueueContextProvider>
                <NotesContextProvider>
                    <div className="main-page__left-section">
                        <ChordsCircle audioContext={audioContext}/>
                        <ChordsQueue/>
                    </div>
                    <div className="main-page__right-section">
                        <PianoKeyboard width={width * 0.7} audioContext={audioContext}/>
                        <SequencerContainer width={width * 0.7}/>
                    </div>
                    <ExportButtons />
                </NotesContextProvider>
            </ChordsQueueContextProvider>
        </div>
    );
}
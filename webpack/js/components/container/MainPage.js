import React, {useEffect, useState} from "react";
import ChordsCircle from "./ChordsCircle";
import ChordsQueue from "./ChordsQueue";
import PianoKeyboard from "./PianoKeyboard";
import SequencerContainer from "./SequencerContainer";
import useCurrentWidth from "../../utils/useCurrentWidth";
import {NotesContextProvider} from "../context/NotesContextProvider";
import {ChordsQueueContextProvider} from "../context";
import {Route} from "react-router-dom";

export default function MainPage() {
    const getWidth = () => {
        return window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;
    }

    const width = useCurrentWidth(getWidth);

    return (
        <div className="main-page">
            <div className="main-page__left-section">
                <ChordsQueueContextProvider>
                    <ChordsCircle/>
                    <ChordsQueue/>
                </ChordsQueueContextProvider>
            </div>
            <div className="main-page__right-section">
                <NotesContextProvider>
                    <PianoKeyboard width={width * 0.7}/>
                    <SequencerContainer width={width * 0.7}/>
                </NotesContextProvider>
            </div>
        </div>
    );
}
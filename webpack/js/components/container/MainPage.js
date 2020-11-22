import React from "react";
import ChordsCircle from "./ChordsCircle";
import ChordsQueue from "./ChordsQueue";

export default function MainPage() {
    return (
        <div className="main-page">
            <div className="main-page__left-section">
                <ChordsCircle />
                <ChordsQueue />
            </div>
            <div className="main-page__right-section"></div>
        </div>
    );
}
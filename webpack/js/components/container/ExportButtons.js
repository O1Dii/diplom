import React from "react";

export default function ExportButtons() {
    return (
        <div className="export-buttons">
            <div className="export-buttons__higher-container">
                <button className="button">Export Chords</button>
                <button className="button">Export Melody</button>
            </div>
            <div className="export-buttons__lower-container">
                <button className="button">Export All</button>
            </div>
        </div>
    );
}
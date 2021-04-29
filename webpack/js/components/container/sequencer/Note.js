import React from 'react'

const Note = props => {
    const noteStyle = {
        left: `${Math.round(props.note.time * 200)}px`,
        width: `${Math.round(props.note.duration * 200)}px`
    }

    return (
        <div className="note" style={noteStyle}>
            <span>
                {props.name}
            </span>
        </div>
    )
}

export default Note

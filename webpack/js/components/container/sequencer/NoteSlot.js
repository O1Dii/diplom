import React from 'react';
import _ from 'lodash';

import Note from './Note';

function NoteSlot({notes, ...props}) {
    return (
        <div className={`note-slot ${props.dark ? 'dark' : 'light'}`} style={{width: `${props.duration * 200}px`}}>
            {notes
                ?
                notes.map((note, i) => (
                    <Note
                        key={_.uniqueId('note_')}
                        name={props.pianoKey}
                        note={note}
                    />
                ))
                :
                null
            }
        </div>
    )
}

export default NoteSlot;

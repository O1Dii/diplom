import React from 'react'
import {wideKeys} from './concerns/keyboard'

function Key({white, name}) {
    const isWide = wideKeys.find(key => name.search(key) !== -1);

    const handleClick = (key) => {
        // Player.triggerKey(key, 0.5)
    }

    return (
        <li className={`${!white ? 'black-tut' : ''} ${isWide ? 'wide' : ''}`} onClick={() => handleClick(name)}>
        <span className="tut">
          <div>
            <i>
              {name}
            </i>
          </div>
        </span>
        </li>)
}

export default Key;

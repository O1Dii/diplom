import React from 'react'

const PlayHead = props => {
  const playheadStyle = {width: props.currentTime * 200}
  return (
    <div className="play-head" style={playheadStyle}>{props.currentTime}</div>
  )
};

export default PlayHead;

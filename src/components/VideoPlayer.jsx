import React from 'react'

const VideoPlayer = (props) => (
  <div class="VideoPlayer">
    <video
      controls
      width="100%"
      height="100%"
      >
        <source src={props.video} type="video/mp4" />
      </video>
  </div>
)

export default VideoPlayer

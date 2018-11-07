import React from 'react'
import lesson1Vid from '../assets/dl-1-1/video.mp4'
import lesson2Vid from '../assets/dl-1-2/video.mp4'
const VIDEO_SOURCES = [lesson1Vid, lesson2Vid]

class VideoPlayer extends React.Component {
  render() {
    console.log('re-rendering video')
    const { lesson } = this.props
      return (
        <div class="VideoPlayer">
          <video
            key={lesson}
            // We must include key here so video player is re-rendered on props change
            controls
            width="100%"
            height="100%"
            >
              <source key={lesson} src={VIDEO_SOURCES[lesson]} type="video/mp4" />
            </video>
        </div>
    )
  }

}

export default VideoPlayer

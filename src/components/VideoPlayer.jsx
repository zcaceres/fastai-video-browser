import React from 'react';
import PropTypes from 'prop-types';
import YouTubePlayer from 'react-player/lib/players/YouTube'

const VIDEO_SOURCES = [
  "XfoYk_Z5AkI",
  "ccMHJeQU4Qw",
  "MpZxV6DVsmM",
  "9YK6AnqpuEA",
  "CJKnDu2dxOE",
  "hkBa9pU-H48",
  "DGdRC4h78_o",
];

const VideoPlayer = (props) => {
  // "https://www.youtube.com/embed/XfoYk_Z5AkI",
  const { lesson } = props;

  // return (
  //   <div className="VideoPlayer">
  //     <video
  //       id={lesson}
  //       key={lesson}
  //       // We must include key here so video player is re-rendered on props change
  //       controls
  //       width="100%"
  //       height="100%"
  //     >
  //       <source key={lesson} src={VIDEO_SOURCES[lesson]} type="video/mp4" />
  //       <track kind="captions" />
  //     </video>
  //   </div>
  // );
};

VideoPlayer.propTypes = {
  lesson: PropTypes.number.isRequired,
};

export default VideoPlayer;

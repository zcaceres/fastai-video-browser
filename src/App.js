import React, { Component, Fragment } from 'react';
import deepLearningVideo from './assets/video/dl-1.mp4'
import transcript from './assets/transcript.json'
import './App.css';

const LESSONS = ['Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4', 'Lesson 5', 'Lesson 6', 'Lesson 7']
const CHAPTERS = ['Chapter 1', 'Chapter 2', 'Chapter 3', 'Chapter 4', 'Chapter 5']


const getMinutes = (seconds) => {
  return (seconds.toFixed(0)/60).toString().split('.')[0]
}

const secondsToTimestamp = (totalSeconds) => {
  let minutes = getMinutes(totalSeconds)
  let remainder = (totalSeconds.toFixed(0) % 60).toString()
  if (minutes.length < 2) minutes = `0${minutes}`
  if (remainder.length < 2) remainder = `0${remainder}`
  return `${minutes}:${remainder}`
}

class App extends Component {
  constructor(props) {
    super(props)
    this.videoPlayer = null;
    this.currentMomentInterval = null;
  }

  state = {
    showLessons: true,
    selectedLesson: 0,
    currentMoment: "00:00",
  }

  componentDidMount() {
    this.videoPlayer = document.querySelector('video');
    this.pollForCurrentMoment();
  }

  pollForCurrentMoment = () => {
    if (this.currentMomentInterval) return
    this.currentMomentInterval = setInterval(() => {
      const timestamp = secondsToTimestamp(this.videoPlayer.currentTime)
      this.setState({ currentMoment: timestamp })
    }, 500)
  }

  goToMoment = (timestamp) => {
    if (!this.videoPlayer) this.videoPlayer = document.querySelector('video');
    this.videoPlayer.currentTime = timestamp;
    this.videoPlayer.play();
    // this.setState({ currentMoment: timestamp })
  }

  toggleLessons = () => {
    this.setState({ showLessons: !this.state.showLessons })
  }

  selectLesson = (selectedLesson ) => {
    this.setState({ selectedLesson })
  }

  render() {
    const { toggleLessons, selectLesson } = this
    const { showLessons, selectedLesson, currentMoment } = this.state
    return (
      <div className="App sans-serif">
        <section className={`left ${this.state.showLessons ? '' : 'closed'}`}>
          <span onClick={toggleLessons} className="toggle-bar white b">{showLessons ? '<' : '>'}</span>
          {showLessons && (
            <Fragment>
              <header className="App-header serif">
                <h1 className="f2 underline white"><a href="http://fast.ai" target="_blank" rel="noopener noreferrer">fast.ai</a></h1>
              </header>
              <div className="lessons white">
                {LESSONS.map((lesson, i) => <div onClick={() => selectLesson(i)} className={`${i === selectedLesson ? 'selected' : ''} lesson ba grow`}>{lesson}</div>)}
              </div>
            </Fragment>
          )}
        </section>
        <section className="right">
          <div className="row">
            <VideoPlayer />
            <div className="chapter-nav white">
            {CHAPTERS.map(chap => {
              return <div className="chapter ba grow">{chap}</div>
            })}
            </div>
          </div>
          <TranscriptBrowser currentMoment={currentMoment} transcript={transcript} />
        </section>
      </div>
    );
  }
}

class TranscriptBrowser extends Component {
  state = {
    search: '',
    currentMoment: null,
  }

  handleChange = (e) => {
    const { value } = e.target
    this.setState({ search: value })
  }

  static getDerivedStateFromProps = (props, state) => {
    if (props.transcript[props.currentMoment]) return { ...state, currentMoment: props.transcript[props.currentMoment] }
    return { ...state }
  }

  get currentMomentSentence () {
    const { transcript, currentMoment } = this.props
    return transcript[currentMoment]
  }

  render() {
    const { transcript } = this.props
    const { search, currentMoment } = this.state
    return <div className="TranscriptBrowser">
      <div className="top">
        <span>Transcript Browser</span>
        <Search search={search} handleChange={this.handleChange} transcript={transcript} />
      </div>
      <div className="bottom">
        {(currentMoment && !search) && <div className="Moment">{currentMoment}</div>}
        {search && ["okay so welcome practical deep learning",
          "for coders less than one it's kind of",
          "lesson two because there's a lesson zero",
          "in less than zero is is why do you need",
          "a GPU and how do you get it set up so if"].map(result => {
          return <div className="search-result dim">{result}</div>
        })}
      </div>
    </div>
  }
}

const VideoPlayer = (props) => (
  <div class="VideoPlayer">
    <video
      controls
      width="100%"
      height="100%"
      >
        <source src={deepLearningVideo} type="video/mp4" />
      </video>
  </div>
)


class Search extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { search, handleChange } = this.props
    return (<div className="Search">
      <input
        className="fl w-100"
        value={search}
        onChange={handleChange}
        placeholder="search transcripts and chapter headings..."
      />
    </div>)
  }
}

// export default VideoPlayer;


export default App;

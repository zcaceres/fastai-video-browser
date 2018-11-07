import React, { Component, Fragment } from 'react';
import VideoPlayer from './components/VideoPlayer'
import TranscriptBrowser from './components/TranscriptBrowser'
import './App.css';
const LESSONS = ['Lesson 1', 'Lesson 2', 'Coming Soon!', 'Coming Soon!', 'Coming Soon!', 'Coming Soon!', 'Coming Soon!']
const CHAPTERS = null // ['Chapter 1', 'Chapter 2', 'Chapter 3', 'Chapter 4', 'Chapter 5']

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

const timestampToSeconds = (moment) => {
  const [minutes, seconds] = moment.split(':')
  return (Number(minutes) * 60) + Number(seconds)
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
    const lessonId = this.videoPlayer.id
    if (!this.videoPlayer || lessonId !== this.state.selectedLesson) this.videoPlayer = document.querySelector('video');
    const time = timestampToSeconds(timestamp)
    this.videoPlayer.currentTime = time;
    this.videoPlayer.play()
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
                {LESSONS.map((lesson, i) => <div key={i} onClick={lesson === 'Coming Soon!' ? () => {} : () => selectLesson(i)} className={`${i === selectedLesson ? 'selected' : ''} lesson ba grow`}>{lesson}</div>)}
              </div>
            </Fragment>
          )}
        </section>
        <section className="right">
          <div className="row">
            <VideoPlayer lesson={selectedLesson} />
            {CHAPTERS && <div className="chapter-nav white">
            {CHAPTERS.map(chap => {
              return <div key={chap} className="chapter ba grow">{chap}</div>
            })}
            </div>}
          </div>
          <TranscriptBrowser lesson={selectedLesson} goToMoment={this.goToMoment} currentMoment={currentMoment} />
        </section>
      </div>
    );
  }
}

export default App;

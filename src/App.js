import React, { Component, Fragment } from 'react';
import deepLearningVideo from './assets/video/dl-1.mp4'
import './App.css';

const LESSONS = ['Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4', 'Lesson 5', 'Lesson 6', 'Lesson 7']

class App extends Component {
  state = {
    showLessons: true,
    selectedLesson: 0,
  }

  toggleLessons = () => {
    this.setState({ showLessons: !this.state.showLessons })
  }

  selectLesson = (selectedLesson ) => {
    this.setState({ selectedLesson })
  }

  render() {
    const { toggleLessons, selectLesson } = this
    const { showLessons, selectedLesson } = this.state
    return (
      <div className="App sans-serif">
        <section className={`left ${this.state.showLessons ? '' : 'closed'}`}>
          <span onClick={toggleLessons} className="toggle-bar white">{showLessons ? '&lt;' : '&gt;'}</span>
          {showLessons && (
            <Fragment>
              <header className="App-header serif">
                <h1 className="f2 underline white">fast.ai</h1>
              </header>
              <div className="lessons white">
                {LESSONS.map((lesson, i) => <div onClick={() => selectLesson(i)} className={`${i === selectedLesson ? 'selected' : ''} lesson ba grow`}>{lesson}</div>)}
              </div>
            </Fragment>
          )}
        </section>
        <section className="right">
          {/* <div className="body-container">
            <div className="VideoPanel fl w-100">
              <VideoPlayer />
              <Search />
            </div>
            <div className="chapter-nav white">
              {['Chapter 1', 'Chapter 2', 'Chapter 3', 'Chapter 4', 1, 2, 3,4, 5].map(chap => {
                return <div className="chapter ba grow">{chap}</div>
              })}
            </div>
          </div> */}
        </section>
      </div>
    );
  }
}

class Search extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    search: ''
  }

  handleChange = (e) => {
    const { value } = e.target
    this.setState({ search: value })
  }

  render() {
    return (<div className="Search">
      <input
        className="fl w-100"
        value={this.state.search}
        onChange={this.handleChange}
        placeholder="search transcripts and chapter headings"
      />
    </div>)
  }
}

const VideoPlayer = (props) => (
  <div class="VideoPlayer">
    <video
      class="VideoPlayer player"
      controls
      width="100%"
      height="100%"
      >
        <source src={deepLearningVideo} type="video/mp4" />
      </video>
  </div>
)

// export default VideoPlayer;


export default App;

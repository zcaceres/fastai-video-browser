import React, { Component } from 'react'
import Search from './Search'
import lesson1Trans from '../assets/dl-1-1/transcript.json'
import lesson2Trans from '../assets/dl-1-2/transcript.json'
const TRANSCRIPTS = [lesson1Trans, lesson2Trans]

class TranscriptBrowser extends Component {
  state = {
    search: '',
    currentMoment: null,
  }

  handleChange = (e) => {
    const { value } = e.target
    this.setState({ search: value.toLowerCase() })
  }

  static getDerivedStateFromProps = (props, state) => {
    const transcript = TRANSCRIPTS[props.lesson]
    if (transcript[props.currentMoment]) return { ...state, currentMoment: transcript[props.currentMoment] }
    return { ...state }
  }

  get currentTranscript() {
    const { lesson } = this.props
    return TRANSCRIPTS[lesson]
  }

  get searchResults() {
    const transcript = this.currentTranscript
    const { search } = this.state
    return Object.keys(transcript)
      .filter(timestamp => transcript[timestamp].toLowerCase().includes(search))
      .map(timestamp => ({ moment: timestamp, sentence: transcript[timestamp] }))
      .slice(0, 6)
  }

  render() {
    const { goToMoment } = this.props
    const { search, currentMoment } = this.state
    return <div className="TranscriptBrowser">
      <div className="top">
        <span>Transcript Browser</span>
        <Search search={search} handleChange={this.handleChange} transcript={this.getTranscript} />
      </div>
      <div className="bottom" key={this.props.currentMoment}>
        {(currentMoment && !search) && <div className="Moment">{currentMoment}</div>}
        {search && this.searchResults.map(result => {
          return <div key={result.moment} onClick={() => goToMoment(result.moment)} className="search-result dim">{result.sentence}</div>
        })}
      </div>
    </div>
  }
}

export default TranscriptBrowser

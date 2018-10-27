import React, { Component } from 'react'
import Search from './Search'

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
    if (props.transcript[props.currentMoment]) return { ...state, currentMoment: props.transcript[props.currentMoment] }
    return { ...state }
  }

  get searchResults() {
    const { transcript } = this.props
    const { search } = this.state
    return Object.keys(transcript)
      .filter(timestamp => transcript[timestamp].toLowerCase().includes(search))
      .map(timestamp => ({ moment: timestamp, sentence: transcript[timestamp] }))
      .slice(0, 6)
  }

  render() {
    const { transcript, goToMoment } = this.props
    const { search, currentMoment } = this.state
    return <div className="TranscriptBrowser">
      <div className="top">
        <span>Transcript Browser</span>
        <Search search={search} handleChange={this.handleChange} transcript={transcript} />
      </div>
      <div className="bottom">
        {(currentMoment && !search) && <div className="Moment">{currentMoment}</div>}
        {search && this.searchResults.map(result => {
          return <div onClick={() => goToMoment(result.moment)} className="search-result dim">{result.sentence}</div>
        })}
      </div>
    </div>
  }
}

export default TranscriptBrowser

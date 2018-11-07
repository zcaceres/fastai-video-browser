import React, { Component } from 'react';
import crypto from 'crypto-js'
const HASH = "7fb2990d51938b98cd97bbc04cd9027c9e4e0e6d21a258a8d9ac10febebdcac64d63025ed50a6ee6aec6b666eaf2549070fbc2250f5d0f31ab0f15fc9896c6df"

export default class PasswordChecker extends Component {
  state = {
    plaintext: ''
  }

  checkPass = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const hashed = crypto.SHA3(this.state.plaintext).toString()
    console.log(hashed)
    console.log(hashed === HASH)
    if (hashed === HASH) return this.props.authed()
    this.setState({ plaintext: '' })
  }

  handleChange = (e) => {
    this.setState({ plaintext: e.target.value })
  }

  render() {
    const { plaintext } = this.state
    return (
        <div className="PasswordChecker">
          <h1 style={{ marginRight: '2vw' }} className="App-header serif f2 underline white"><a href="http://fast.ai" target="_blank" rel="noopener noreferrer">fast.ai</a></h1>
          <form onSubmit={this.checkPass}>
            <input type="password" value={plaintext} onChange={this.handleChange}/>
            <button>Submit</button>
          </form>
        </div>
    )
  }
}

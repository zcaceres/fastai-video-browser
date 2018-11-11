import React, { Component } from 'react';
import App from './App';
import PasswordChecker from './components/PasswordChecker';

export default class AuthWrapper extends Component {
  state = {
    authed: false,
  }

  authed = () => {
    this.setState({ authed: true });
  }

  render() {
    const { authed } = this.state;

    if (!authed) return <PasswordChecker authed={this.authed} />;

    return <App />;
  }
}

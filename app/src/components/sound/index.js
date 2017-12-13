import React, { Component } from 'react';

class Sound extends Component {
  render () {
    const url = (this.state.sound) ? 'https://png.icons8.com/audio-filled/ios7/32/000000' : 'https://png.icons8.com/no-audio-filled/ios7/32/000000';
    return (
      <img src={url} onClick={this.toggleSound} alt="toggle sound" />
    );
  }

  constructor (...args) {
    super(...args);

    this.state = {
      sound: true,
    };

    this.toggleSound = this.toggleSound.bind(this);
  }

  componentDidMount () {
    this._audio = document.getElementById('audio');
  }

  toggleSound () {
    if (this.state.sound) { this._audio.pause(); }
    else { this._audio.play(); }

    this.setState({ sound: !this.state.sound });
  }
};

Sound.displayName = 'Sound';

export default Sound;

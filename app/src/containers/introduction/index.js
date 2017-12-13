// NPM.
import React, { Component } from 'react';

// Local.
import './introduction.css';
import { Welcome } from '../../data/news-copy';

class Introduction extends Component {
  render () {
    return (
      <div className="intro-container">
        <h1 className="intro-heading">{Welcome.heading}</h1>
        <div className="bullets-container">
          <span>{Welcome.copy[0]}</span>
          <span>{Welcome.copy[1]}</span>
          <span>{Welcome.copy[2]}</span>
          <span>{Welcome.copy[3]}</span>
          <span>{Welcome.copy[4]}</span>
        </div>
      </div>
    );
  }
};

Introduction.displayName = 'Introduction';

export default Introduction;

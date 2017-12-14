/* eslint-disable jsx-a11y/accessible-emoji */

// NPM.
import React, { Component } from 'react';

// Local.
import './fake-news.css';
import { FakeVsBias as Copy } from '../../data/news-copy';
import emojiNose from '../../images/emoji-nose.png';
import emojiPoop from '../../images/emoji-poop.png';
import emojiThumbsDown from '../../images/emoji-thumbsdown.png';
import emojiRolleyes from '../../images/emoji-rolleyes.png';
import emojiDetective from '../../images/emoji-detective.png';
import emojiShock from '../../images/emoji-scream.png';
import emojiShrug from '../../images/emoji-shrug.png';

class FakeNews extends Component {
  render () {
    return (
      <div className="fake-container">
        <h1 className="newspaper-heading">{Copy.heading}</h1>
        <h3 className="newspaper-subheading">{Copy.subheading}</h3>
        <div className="fake-contents">
          <div className="fake-row">
            <h2 className="newspaper-heading">vs.</h2>
          </div>
          <div className="fake-titles">
            <h2 className="newspaper-heading">Fake News</h2>
            <h2 className="newspaper-heading">Biased News</h2>
          </div>
          <div className="fake-row">
            <div className="body-fake fake-bullets">
              <div className="fake-bullet">
                <img className="fake-emoji" src={emojiNose} alt="liar" />
                <span>{Copy.copy[0]}</span>
              </div>
              <div className="fake-bullet">
                <img className="fake-emoji" src={emojiPoop} alt="poop" />
                <span>{Copy.copy[1]}</span>
              </div>
              <div className="fake-bullet">
                <img className="fake-emoji" src={emojiThumbsDown} alt="thumbs down" />
                <span>{Copy.copy[2]}</span>
              </div>
              <div className="fake-bullet">
                <img className="fake-emoji" src={emojiRolleyes} alt="rolling eyes" />
                <span>{Copy.copy[3]}</span>
              </div>
            </div>
            <div className="body-fake">&nbsp;</div>
            <div className="body-fake biased-bullets">
              <div className="fake-bullet">
                <img className="fake-emoji" src={emojiDetective} alt="detective" />
                <span>{Copy.copy[4]}</span>
              </div>
              <div className="fake-bullet">
                <img className="fake-emoji" src={emojiShock} alt="shock" />
                <span>{Copy.copy[5]}</span>
              </div>
              <div className="fake-bullet">
                <img className="fake-emoji" src={emojiShrug} alt="shrug" />
                <span>{Copy.copy[6]}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
};

FakeNews.displayName = 'FakeNews';

export default FakeNews;

/* eslint-disable jsx-a11y/accessible-emoji */

// NPM.
import React, { Component } from 'react';

// Local.
import './fake-news.css';
import { FakeVsBias as Copy } from '../../data/news-copy';

/*
 * 😉 🤔 🙄 😒 💩 🤦‍♂️ 🤦‍♀️ 👎
 * 😏 😮 🤑 😲 😕 😟 😤 😱 🕵️‍♀️ 🤷
 */

class FakeNews extends Component {
  render () {
    return (
      <div className="fake-container">
        <h1 className="newspaper-heading">{Copy.heading}</h1>
        <h3 className="newspaper-subheading">{Copy.subheading}</h3>
        <div className="fake-contents">
          <div className="fake-row">
            <h1 className="newspaper-heading">vs.</h1>
          </div>
          <div className="fake-titles">
            <h1 className="newspaper-heading">Fake News</h1>
            <h1 className="newspaper-heading">Biased News</h1>
          </div>
          <div className="fake-row">
            <div className="body-fake fake-bullets">
              <div className="fake-bullet">
                <span className="fake-emoji">🤥</span>
                <span>{Copy.copy[0]}</span>
              </div>
              <div className="fake-bullet">
                <span className="fake-emoji">💩</span>
                <span>{Copy.copy[1]}</span>
              </div>
              <div className="fake-bullet">
                <span className="fake-emoji">👎</span>
                <span>{Copy.copy[2]}</span>
              </div>
              <div className="fake-bullet">
                <span className="fake-emoji">🙄</span>
                <span>{Copy.copy[3]}</span>
              </div>
            </div>
            <div className="body-fake">&nbsp;</div>
            <div className="body-fake biased-bullets">
              <div className="fake-bullet">
                <span className="fake-emoji">🕵️‍</span>
                <span>{Copy.copy[4]}</span>
              </div>
              <div className="fake-bullet">
                <span className="fake-emoji">😱</span>
                <span>{Copy.copy[5]}</span>
              </div>
              <div className="fake-bullet">
                <span className="fake-emoji">🤷</span>
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

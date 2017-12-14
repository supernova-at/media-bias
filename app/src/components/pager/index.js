/*
 * Imports.
 */

// NPM.
import React, { Component } from 'react';

// Local.
import './pager.css';
import arrowImage from '../../images/icons8-right-arrow.png';
import SocialShare, { Platforms } from '../social-share';
import Sound from '../sound';

// Members.
// TODO: ideally this gets tied in with the news-copy itself.
// Page number --> footer text map
const copy = new Map();
copy.set(1, `Let's Get Started`);
copy.set(2, `I'm done picking sources`);
copy.set(3, `I want unbiased news!`);
copy.set(4, `So what can I do?`);
copy.set(5, `Let's play a game`);
copy.set(6, `Okay, I'm ready to play`);
copy.set(7, `How did I do?`);
copy.set(8, `What does this mean for me?`);
copy.set(9, `Cool, thanks!`);
copy.set(10, `Play again`);

/**
 * The Pager displays the current page.
 */
class Pager extends Component {
  render () {
    // Note: this.state.page is 1-based, so we subtract 1 for index into the array.
    const currentPage = React.Children.toArray(this.props.children)[this.state.page - 1];
    const hasNextPage = this.state.page < this._numPages;

    return (
      <div className="pager">
        <div className="page">
          { currentPage }
        </div>
        <PagerFooter
          hasNextPage={hasNextPage}
          fnNext={this.nextPage}
          currentPageNumber={this.state.page}>
        </PagerFooter>
      </div>
    );
  }

  constructor (...args) {
    super(...args);

    // Initialize state.
    this.state = {
      page: 1,
    };

    // Private member variables.
    this._numPages = React.Children.count(this.props.children);

    // Bind class functions.
    this.nextPage = this.nextPage.bind(this);
  }

  /*
   * Event Handlers.
   */
  nextPage () {
    ga('send', 'event', {
      eventCategory: 'Next Page',
      eventAction: 'click',
      eventLabel: 'Current Page',
      eventValue: this.state.page,
    });
    this.setState({ page: this.state.page + 1 });
  }
};

Pager.displayName = 'Pager';

/**
 * Renders the progress indicator at the bottom of the Pager.
 */
const PagerFooter = ({ hasNextPage, fnNext, currentPageNumber }) => {
  const isFirstPage = currentPageNumber === 1;
  const nextPageNumber = currentPageNumber + 1;
  const buttonText = copy.get(currentPageNumber) || `Continued on Page ${nextPageNumber}`;
  const fnNextStep = (hasNextPage) ? fnNext : () => window.location.href="http://www.mediabiasexperience.com";

  return (
    <div className="page-footer">
      <div className="social-shares">
        <Sound />
        &nbsp;
        <SocialShare platform={Platforms.Facebook} />
        &nbsp;
        <SocialShare platform={Platforms.Twitter} />
      </div>
      <div className="page-footer-cta">
        { isFirstPage && (
          <img src={arrowImage} id="footer-arrow" alt="arrow" />
        )}
        <button onClick={fnNextStep}>
          <h3>{buttonText}</h3>
        </button>
      </div>
    </div>
  );
};

export default Pager;

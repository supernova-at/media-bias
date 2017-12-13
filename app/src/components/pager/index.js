/*
 * Imports.
 */

// NPM.
import React, { Component } from 'react';

// Local.
import './pager.css';
import arrowImage from '../../images/icons8-right-arrow.png';
import SocialShare, { Platforms } from '../social-share';

// Members.
// TODO: ideally this gets tied in with the news-copy itself.
// Page number --> footer text map
const copy = new Map();
copy.set(1, `Start the experience`);
copy.set(2, `I'm done picking sources`);
copy.set(3, `I want unbiased news!`);
copy.set(4, `So what can I do?`);
copy.set(5, `Let's play a game`);
copy.set(6, `Okay, I'm ready`);
copy.set(7, `Show me the answers`);

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

  return (
    <div className="page-footer">
      <div className="social-shares">
        <SocialShare platform={Platforms.Facebook} />
        &nbsp;
        <SocialShare platform={Platforms.Twitter} />
      </div>

      { hasNextPage && (
        <div className="page-footer-cta">
          { isFirstPage && (
            <img src={arrowImage} alt="arrow" />
          )}
          <button onClick={fnNext}>
            <h3>{buttonText}</h3>
          </button>
        </div>
      )}
    </div>
  );
};

export default Pager;

/*
 * Imports.
 */

// NPM.
import React, { Component } from 'react';

// Local.
import './pager.css';
import arrowImage from '../../images/icons8-right-arrow.png';

/**
 * The Pager displays the current page.
 */
class Pager extends Component {
  render () {
    // Note: this.state.page is 1-based, so we subtract 1 for index into the array.
    const currentPage = React.Children.toArray(this.props.children)[this.state.page - 1];
    const hasPreviousPage = this.state.page > 1;
    const hasNextPage = this.state.page < this._numPages;

    return (
      <div className="pager">
        <div className="page">
          { currentPage }
        </div>
        <PagerFooter
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
          fnNext={this.nextPage}
          fnPrevious={this.previousPage}
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
    this.previousPage = this.previousPage.bind(this);
  }

  /*
   * Event Handlers.
   */
  nextPage () {
    this.setState({ page: this.state.page + 1 });
  }
  previousPage () {
    this.setState({ page: this.state.page - 1 });
  }
};

Pager.displayName = 'Pager';

/**
 * Renders the progress indicator at the bottom of the Pager.
 */
const PagerFooter = ({ hasNextPage, hasPreviousPage, fnNext, fnPrevious, currentPageNumber }) => {
  const isFirstPage = currentPageNumber === 1;
  const nextPageNumber = currentPageNumber + 1;
  const previousPageNumber = currentPageNumber - 1;

  return (
    <div className="page-footer">
      { hasPreviousPage && (
        <button onClick={fnPrevious}>
          Return to Page {previousPageNumber}
        </button>
      )}

      { /* Place an empty div to keep flex item display when no previous btn. */ }
      { !hasPreviousPage && <div />}

      { hasNextPage && (
        <div className="page-footer-cta">
          { isFirstPage && (
            <img src={arrowImage} alt="arrow" />
          )}
          <button onClick={fnNext}>
            Continued on Page {nextPageNumber}
          </button>
        </div>
      )}
    </div>
  );
};

export default Pager;

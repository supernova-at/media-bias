/*
 * Imports.
 */

// NPM.
import React, { Component } from 'react';

// Local.
import './pager.css';

/**
 * The Pager displays the current page.
 */
class Pager extends Component {
  render () {
    // Note: this.state.page is 1-based, so we subtract 1 for index into the array.
    const currentPage = React.Children.toArray(this.props.children)[this.state.page - 1];
    const hasNextPage = this.state.page < this._numPages;
    const nextPageNumber = this.state.page + 1;

    return (
      <div className="pager">
        <div className="page">
          { currentPage }
        </div>
        <PagerFooter
          hasNextPage={hasNextPage}
          fnNext={this.nextPage}
          nextPageNumber={nextPageNumber}>
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
    if (this.state.page < this._numPages) {
      this.setState({ page: (this.state.page + 1) });
    }
  }
};

Pager.displayName = 'Pager';

/**
 * Renders the progress indicator at the bottom of the Pager.
 * @param {Boolean} hasNextPage   - Whether or not there is a next page.
 * @param {Function} fnNext       - Go forward.
 * @param {Number} nextPageNumber - The number of the next page.
 */
const PagerFooter = ({ hasNextPage, fnNext, nextPageNumber }) => {
  return (
    <div className="page-footer">
      { hasNextPage && (
        <button onClick={fnNext}>Continued on Page {nextPageNumber}</button>
      )}
    </div>
  );
};

export default Pager;

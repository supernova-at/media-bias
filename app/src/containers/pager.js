/*
 * Imports.
 */

// NPM.
import React, { Component } from 'react';

/**
 * The Pager displays the current page.
 */
class Pager extends Component {
  render () {
    // Note: this.state.page is 1-based, so we subtract 1 for index into the array.
    const currentPage = React.Children.toArray(this.props.children)[this.state.page - 1];

    return (
      <div className="pager">
        <div className="page">
          { currentPage }
        </div>
        <PagerFooter
          fnPrevious={this.previousPage}
          fnNext={this.nextPage}
          currentPage={this.state.page}
          totalPages={this._numPages}
          />
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
    this.previousPage = this.previousPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }

  /*
   * Event Handlers.
   */
  previousPage () {
    if (this.state.page > 1) {
      this.setState({ page: (this.state.page - 1) });
    }
  }
  nextPage () {
    if (this.state.page < this._numPages) {
      this.setState({ page: (this.state.page + 1) });
    }
  }
};

Pager.displayName = 'Pager';

/**
 * Renders the progress indicator at the bottom of the Pager.
 * @param {Function} fnPrevious   - Go back.
 * @param {Function} fnNext       - Go forward.
 * @param {Number} currentPage    - The current page (1-based).
 * @param {Number} totalPages     - The total number of pages.
 */
const PagerFooter = ({ fnPrevious, fnNext, currentPage, totalPages }) => {
  return (
    <div className="page-footer">
      <button onClick={fnPrevious}>Previous</button>
      <span>Page: {currentPage} of {totalPages}</span>
      <button onClick={fnNext}>Next</button>
    </div>
  );
};

export default Pager;

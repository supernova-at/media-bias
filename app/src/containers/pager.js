/*
 * Imports.
 */

// NPM.
import React, { Component } from 'react';

// Local.
import Page from '../components/page';

/**
 * The Pager displays the current page.
 */
class Pager extends Component {
  render () {
    const currentPage = React.Children.toArray(this.props.children)[this.state.page];
    const displayPageNumber = this.state.page + 1;
    const displayPagesTotal = this._numPages + 1;

    return (
      <div>
        { currentPage }
        <hr />
        <button onClick={this.previousPage}>Previous</button>
        <span>Page: {displayPageNumber} of {displayPagesTotal}</span>
        <button onClick={this.nextPage}>Next</button>
      </div>
    );
  }

  constructor (...args) {
    super(...args);

    // Private member variables.
    this._numPages = React.Children.count(this.props.children) - 1;

    // Initialize state.
    this.state = {
      page: 0,
    };

    // Bind class functions.
    this.previousPage = this.previousPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }

  /*
   * Event Handlers.
   */
  previousPage () {
    if (this.state.page > 0) {
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

export default Pager;

/*
 * Imports.
 */

// NPM.
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Local.
import './news-copy.css';
import Newspaper from '../newspaper';

class NewsCopy extends Component {
  render () {
    const { source: data } = this.props;
    const { heading, subheading, copy } = data;

    return (
      <div className="newspaper-copy">
        <h1 className="newspaper-heading">{heading}</h1>
        <h2 className="newspaper-subheading">{subheading}</h2>
        <div className="copy-contents">
          <div className="copy-row">
            <div className="center news-copy copy-1">
              <h3>
                { copy[0] }
              </h3>
            </div>
            <div className="center news-copy copy-2">
              <h3>
                { copy[1] }
              </h3>
            </div>
          </div>
          <div className="copy-row">
            <div className="center news-copy copy-3">
              <h3>
                { copy [2] }
              </h3>
            </div>
            { copy[3] && (
              <div className="center news-copy copy-4">
                <h3>
                  { copy [3] }
                </h3>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
};

NewsCopy.displayName = 'NewsCopy';

NewsCopy.propTypes = {
  source: PropTypes.object.isRequired,
};

export default NewsCopy;

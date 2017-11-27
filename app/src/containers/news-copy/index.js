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
    const single = typeof copy === 'string';

    if (single) {
      return (
        <div>
          <h1>{copy}</h1>
        </div>
      )
    }
    else {
      if (!copy) {
        return (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1>{heading}</h1>
            <h2 className="newspaper-subheading">{subheading}</h2>
          </div>
        )
      }
      else {
        return (
          <div className="newspaper-copy">
            <h1 className="newspaper-heading">{heading}</h1>
            <h2 className="newspaper-subheading">{subheading}</h2>
            <div>
              <ul>
                <li>{ copy[0] }</li>
                <li>{ copy[1] }</li>
                { copy[2] && <li>{ copy[2] }</li> }
                { copy[3] && <li>{ copy[3] }</li> }
              </ul>
            </div>
          </div>
        )
      }
    }
  }
};

NewsCopy.displayName = 'NewsCopy';

NewsCopy.propTypes = {
  source: PropTypes.object.isRequired,
};

export default NewsCopy;

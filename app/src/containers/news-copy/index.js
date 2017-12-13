/*
 * Imports.
 */

// NPM.
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Local.
import './news-copy.css';

class NewsCopy extends Component {
  render () {
    const { source: data } = this.props;
    const { heading, subheading, copy } = data;
    const single = typeof copy === 'string';

    let bullets = [...copy];
    bullets = bullets.map(string => {
      const split = string.split('*');

      if (split.length === 1) {
        // Nothing is emphasized.
        return (
          <span>{string}</span>
        );
      }
      else {
        // We have things to emphasize.
        return (
          <div>
            <span>{split[0]}</span>
            <span><strong>{split[1]}</strong></span>
            <span>{split[2]}</span>
          </div>
        );
      }
    });


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
            <h3 className="newspaper-subheading">{subheading}</h3>
          </div>
        )
      }
      else {
        return (
          <div className="newspaper-copy">
            <h1 className="newspaper-heading">{heading}</h1>
            <h3 className="newspaper-subheading">{subheading}</h3>
            <div className="news-copy-body">
              <ul className="news-copy-list">
                <li>{ bullets[0] }</li>
                <li>{ bullets[1] }</li>
                { bullets[2] && <li>{ bullets[2] }</li> }
                { bullets[3] && <li>{ bullets[3] }</li> }
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

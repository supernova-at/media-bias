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

    const display = data.columns.map((column) => {
      return column.map((pgraph, index) => {
        return (
          <p key={index}>{ pgraph }</p>
        );
      });
    });
    
    return (
      <Newspaper
        heading={data.heading}
        subhead={data.subheading}
        columnCount={data.columns.length}
      >
        { display }
      </Newspaper>
    )
  }
};

NewsCopy.displayName = 'NewsCopy';

NewsCopy.propTypes = {
  source: PropTypes.object.isRequired,
};

export default NewsCopy;

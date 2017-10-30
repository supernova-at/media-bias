/*
 * Imports.
 */

// NPM.
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Local.
import './newspaper.css';

class Newspaper extends Component {
  render () {
    const { children, columnCount, heading, subhead } = this.props;

    // Map of columnIndex -> children for that column.
    const columnsMap = {};
    for (let index = 0; index < columnCount; index++) {
      columnsMap[index] = [];
    }

    // Now loop over the children and distribute them evenly across the columns.
    const childrenPerColumn = Math.ceil(React.Children.count(children) / columnCount);
    React.Children.toArray(children)
      .forEach((child, index) => {
        let bucket;
        for (let multiplier = 1; multiplier <= columnCount; multiplier++) {
          const upperBound = childrenPerColumn * multiplier;
          if (index < upperBound) {
            bucket = multiplier - 1;
            break;
          }
        }
        columnsMap[bucket].push(child);
      });

    // Create the containers based on the columns object.
    const columns = Object.keys(columnsMap)
      .map((key) => (
        <div key={key} className="newspaper-column">
          { columnsMap[key] }
        </div>
      ));

    return (
      <div className="newspaper">
        <h1 className="newspaper-heading">{heading}</h1>
        <h2 className="newspaper-subheading">{subhead}</h2>
        <div className="newspaper-columns">
          { columns }
        </div>
      </div>
    );
  }
};

Newspaper.displayName = 'Newspaper';

Newspaper.propTypes = {
  columnCount: PropTypes.number.isRequired,
  heading: PropTypes.string.isRequired,
  subhead: PropTypes.string,
};

export default Newspaper;

/*
 * Imports.
 */

// NPM.
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Local.
import './newspaper.css';

// Members.
export const Directions = {
  Row: 0,
  Column: 1,
};

/*
 * The Newspaper Class distributes its children evenly across the
 * desired number of columns.
 */
class Newspaper extends Component {
  render () {
    const { children, columnCount, direction, heading, subhead } = this.props;

    // Map of columnIndex -> children for that column.
    const columnsMap = {};
    for (let index = 0; index < columnCount; index++) {
      columnsMap[index] = [];
    }

    /**
     * Fills like this:
     * 1 4 7
     * 2 5 8
     * 3 6 9
     */
    const columnFn = (child, index) => {
      const childrenPerColumn = Math.ceil(React.Children.count(children) / columnCount);
      let bucket;
      for (let multiplier = 1; multiplier <= columnCount; multiplier++) {
        const upperBound = childrenPerColumn * multiplier;
        if (index < upperBound) {
          bucket = multiplier - 1;
          break;
        }
      }
      columnsMap[bucket].push(child);
    };

    /**
     * Fills like this:
     * 1 2 3
     * 4 5 6
     * 7 8 9
     */
    const rowFn = (child, index) => {
      const i = index % columnCount;
      columnsMap[i].push(child);
    };

    // Now loop over the children and distribute them.
    const distributeFn = (direction === Directions.Column) ? columnFn : rowFn;
    React.Children.toArray(children).forEach(distributeFn);

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
        <h3 className="newspaper-subheading">{subhead}</h3>
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
  direction: PropTypes.number,
  heading: PropTypes.string.isRequired,
  subhead: PropTypes.string,
};

Newspaper.defaultProps = {
  direction: Directions.Column,
};

export default Newspaper;

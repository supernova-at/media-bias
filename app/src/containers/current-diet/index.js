/*
 * Imports.
 */

// NPM.
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Local.
// Styles.
import './current-diet.css';
// Components.
import Newspaper, { Directions } from '../newspaper';
import { SelectableOutlet } from '../../components/outlet';
// Data.
import { sources } from '../../data/bias.json';
import { CurrentDiet as Copy } from '../../data/news-copy';

/*
 * The entry point for the CurrentDiet page.
 */
class CurrentDiet extends Component {
  render () {
    let outlets = sources.map((definition, index) => (
      <SelectableOutlet
        key={index}
        name={definition.name}
        onClick={this.context.toggleOutletInDiet}>
      </SelectableOutlet>
    ));

    return (
      <Newspaper
        heading={Copy.heading}
        subhead={Copy.subheading}
        columnCount={7}
        direction={Directions.Row}>
        { outlets }
      </Newspaper>
    );
  }
};

CurrentDiet.displayName = 'CurrentDiet';

CurrentDiet.contextTypes = {
  toggleOutletInDiet: PropTypes.func,
};

export default CurrentDiet;

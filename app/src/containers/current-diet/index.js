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
import Newspaper from '../newspaper';
import { SelectableOutlet } from '../../components/outlet';
// Data.
import { sources } from '../../data/bias.json';

/*
 * The entry point for the CurrentDiet page.
 */
class CurrentDiet extends Component {
  render () {
    const headCopy = 'What is your current media diet?';
    const subheadCopy = 'Select all that apply';

    let outlets = sources.map((definition, index) => (
      <SelectableOutlet
        key={index}
        name={definition.name}
        onClick={this.context.toggleOutletInDiet}>
      </SelectableOutlet>
    ));

    return (
      <Newspaper
        heading={headCopy}
        subhead={subheadCopy}
        columnCount={7}>
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

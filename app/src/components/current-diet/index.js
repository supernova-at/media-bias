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
import Newspaper from '../../containers/newspaper';
import { SelectableOutlet } from '../outlet';
// Data.
import { sources } from '../../data/bias.json';

/*
 * The entry point for the CurrentDiet page.
 */
class CurrentDietContents extends Component {
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

CurrentDietContents.displayName = 'CurrentDietContents';

CurrentDietContents.contextTypes = {
  toggleOutletInDiet: PropTypes.func,
};

export default CurrentDietContents;

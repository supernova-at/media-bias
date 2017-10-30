/*
 * Imports.
 */

// NPM.
import React from 'react';

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
const CurrentDietContents = (props) => {
  const headCopy = 'What is your current media diet?';
  const subheadCopy = 'Select all that apply';

  let outlets = sources.map((definition, index) => (
    <SelectableOutlet key={index} name={definition.name} />
  ));

  return (
    <Newspaper
      heading={headCopy}
      subhead={subheadCopy}
      columnCount={7}>
      { outlets }
    </Newspaper>
  );
};

CurrentDietContents.displayName = 'CurrentDietContents';

export default CurrentDietContents;

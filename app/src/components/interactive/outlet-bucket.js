/*
 * Imports.
 */

// NPM.
import React from 'react';

/*
 * Members.
 */
// Data.
import { sources as bias } from '../../data/bias.json';

// Components.
import { DraggableOutlet } from '../outlet';

/**
 * The grouping from which to drag Outlets.
 */
const OutletBucket = () => {
  const outlets = bias
    .shuffle()
    .map((definition, index) => (
      <DraggableOutlet name={definition.name} key={index} />
    ));

  return (
    <div className="outlets-container">
      <h3 className="outlets-title">News Outlets</h3>
      <div className="outlets-bucket">
        { outlets }
      </div>
    </div>
  );
};

/*
 * Fisher-Yates shuffling algorithm.
 * @see https://gist.github.com/cacheflow/bf6b8d4e96dab6e79847.
 */
Array.prototype.shuffle = function() {
  var i = this.length, randomNum, randomNumIndex;
  while(--i > 0) {
    // Select a random item from the 'front' of the array.
    randomNum = Math.floor(Math.random() * (i + 1));
    randomNumIndex = this[randomNum];

    // And swap it with the 'end' marker (i).
    this[randomNum] = this[i];
    this[i] = randomNumIndex;
  }
  return this;
};

OutletBucket.displayName = 'OutletBucket';

export default OutletBucket;

/*
 * Imports.
 */

// NPM.
import React from 'react';

/**
 * The grouping from which to drag Outlets.
 */
const OutletBucket = ({ outlets }) => {
  return (
    <div className="outlets-container">
      <span className="outlets-title capitalize">News Outlets</span>
      <div className="outlets-bucket">
        { outlets }
      </div>
    </div>
  );
};

OutletBucket.displayName = 'OutletBucket';

export default OutletBucket;

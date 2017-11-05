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
      <h3 className="outlets-title">News Outlets</h3>
      <div className="outlets-bucket">
        { outlets }
      </div>
    </div>
  );
};

OutletBucket.displayName = 'OutletBucket';

export default OutletBucket;

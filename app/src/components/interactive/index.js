/*
 * Imports.
 */

// NPM.
import React from 'react';

// Local.
import './index.css';

import OutletBucket from './outlet-bucket';
import DropZones from './drop-zones';

/*
 * The Interactive Component.
 */
const Interactive = () => (
  <div className="interactive">
    <OutletBucket />
    <DropZones />
  </div>
);

Interactive.displayName = 'Interactive';

export default Interactive;

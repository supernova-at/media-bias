/*
 * Imports.
 */

// NPM.
import React from 'react';

// Local.
import './index.css';

import OutletBucket from './outlet-bucket';
import { DraggableOutlet } from '../outlet';
import DropZone from './drop-zone';

/*
 * The Interactive Component.
 */
const Interactive = () => (
  <div className="interactive">
    <OutletBucket />
    <div>
      <DropZone title="left" />
      <DropZone title="center" />
      <DropZone title="right" />
    </div>
  </div>
);

Interactive.displayName = 'Interactive';

export default Interactive;

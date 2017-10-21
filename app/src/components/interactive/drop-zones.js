/*
 * Imports.
 */

// NPM.
import React from 'react';

// Local.
import DropZone from './drop-zone';

/**
 * The container that houses each individual drop zone.
 */
const DropZones = () => (
  <div className="drop-zones">
    <DropZone title="left" />
    <DropZone title="lean left" />
    <DropZone title="center" />
    <DropZone title="lean right" />
    <DropZone title="right" />
  </div>
);

DropZones.displayName = 'DropZones';

export default DropZones;

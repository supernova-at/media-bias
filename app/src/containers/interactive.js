/*
 * Imports.
 */

// NPM.
import React from 'react';

// Local.
import { DraggableOutlet } from '../components/outlet';
import DropZone from '../components/drop-zone';

/*
 * The Page1 Component.
 */
const Page1 = (props) => (
  <div style={{
      display: 'flex',
      flexDirection: 'column',

      height: '190px',
    }}>
    <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start',

        height: '175px',
      }}>
      <DropZone title="left" />
      <DropZone title="lean left" />
      <DropZone title="center" />
      <DropZone title="lean right" />
      <DropZone title="right" />
    </div>
    <DraggableOutlet name="NBC News" />
  </div>
);

Page1.displayName = 'Page1';

export default Page1;

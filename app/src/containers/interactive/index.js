/*
 * Imports.
 */

// NPM.
import React, { Component } from 'react';

// Local.
// Styles.
import './index.css';
// Components.
import OutletBucket from './outlet-bucket';
import DropZone from './drop-zone';
import Outlet, { DraggableOutlet } from '../../components/outlet';
// Data.
import { sources as bias } from '../../data/bias.json';
import { Zones } from '../../zones';

/*
 * The Interactive Component.
 */
class Interactive extends Component {
  render () {
    const { bucket } = this.state;
    const left = this.state[Zones.Left],
          leanleft = this.state[Zones.LeanLeft],
          center = this.state[Zones.Center],
          leanright = this.state[Zones.LeanRight],
          right = this.state[Zones.Right];

    return (
      <div className="interactive">
        <OutletBucket outlets={bucket} />
        <div className="drop-zones">
          <DropZone title={Zones.Left} outlets={left} />
          <DropZone title={Zones.LeanLeft} outlets={leanleft} />
          <DropZone title={Zones.Center} outlets={center} />
          <DropZone title={Zones.LeanRight} outlets={leanright} />
          <DropZone title={Zones.Right} outlets={right} />
        </div>
      </div>
    );
  }

  constructor (...args) {
    super(...args);

    // Bind class functions.
    this.moveOutlet = this.moveOutlet.bind(this);

    /*
     * Initialize State.
     */
    const isInteractive = el => el.interactive === 'true';
    let outlets = bias
      .filter(isInteractive);

    outlets = window
      .shuffle(outlets) // @see index.html
      .map((definition, index) => (
        <DraggableOutlet
          key={index}
          name={definition.name}
          onDragEnd={this.moveOutlet}>
        </DraggableOutlet>
      ));

    this.state = {
      // The initial drag bucket.
      bucket: outlets,
      // The bias drop zones.
      [Zones.Left]: [],
      [Zones.LeanLeft]: [],
      [Zones.Center]: [],
      [Zones.LeanRight]: [],
      [Zones.Right]: []
    };
  }

  /*
   * Event Handlers.
   */
  /**
   * Does the work of moving an outlet from the bucket to a bias zone.
   * @param  {String} outletName - The name of the outlet to move.
   * @param  {String} zoneTitle  - The title of the bias zone to move it to.
   */
  moveOutlet (outletName, zoneTitle) {
    // Remove from bucket.
    const keepers = (el) => el.props.name !== outletName;
    const updatedBucket = this.state.bucket
      .filter(keepers);

    // Add to drop zone.
    const targetZone = this.state[zoneTitle];
    const updatedZone = targetZone.concat([
      <Outlet
        key={outletName}
        name={outletName}>
      </Outlet>
    ]);

    this.setState({
      bucket: updatedBucket,
      [zoneTitle]: updatedZone,
    });
  }
};

Interactive.displayName = 'Interactive';

export default Interactive;

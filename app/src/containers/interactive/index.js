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
    const {
      bucket,
      [Zones.Left]: left,
      [Zones.LeanLeft]: leanleft,
      [Zones.Center]: center,
      [Zones.LeanRight]: leanright,
      [Zones.Right]: right,
    } = this.state;

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
    this.saveStateToStore = this.saveStateToStore.bind(this);

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

    this.state = window.interactive || {
      // The initial drag bucket.
      bucket: outlets,
      // The bias drop zones.
      [Zones.Left]: [],
      [Zones.LeanLeft]: [],
      [Zones.Center]: [],
      [Zones.LeanRight]: [],
      [Zones.Right]: []
    };

    this.saveStateToStore();
  }

  /*
   * Event Handlers.
   */
  /**
   * Does the work of moving an outlet from the bucket to a bias zone.
   * @param  {String} outletName - The name of the outlet to move.
   * @param  {String} destination  - The key of the bias zone to move it to.
   */
  moveOutlet (outletName, destination) {
    const keepers = el => el.props.name !== outletName;

    /**
     * Adds a draggable outlet to a zone only if that zone is the destination.
     * @param  {Array} zone   - The zone to examine.
     * @param  {Array} value  - The zone's value after having been filtered.
     * @return {Array} The updated value of this zone.
     */
    function conditionalAdd (zone, value) {
      if (zone === this.state[destination]) {
        const newOutlet = (
          <DraggableOutlet
            key={outletName}
            name={outletName}
            onDragEnd={this.moveOutlet}>
          </DraggableOutlet>
        );
        value = value.concat([newOutlet]);
      }

      return value;
    }


    // Remove the outlet from whatever bucket its currently in and add it
    // to its new home.
    this.setState((prevState) => ({
      bucket: prevState.bucket.filter(keepers), // don't ever add back to bucket.
      [Zones.Left]: conditionalAdd.call(this, this.state[Zones.Left], prevState[Zones.Left].filter(keepers)),
      [Zones.LeanLeft]: conditionalAdd.call(this, this.state[Zones.LeanLeft], prevState[Zones.LeanLeft].filter(keepers)),
      [Zones.Center]: conditionalAdd.call(this, this.state[Zones.Center], prevState[Zones.Center].filter(keepers)),
      [Zones.LeanRight]: conditionalAdd.call(this, this.state[Zones.LeanRight], prevState[Zones.LeanRight].filter(keepers)),
      [Zones.Right]: conditionalAdd.call(this, this.state[Zones.Right], prevState[Zones.Right].filter(keepers)),
    }), () => {
      this.saveStateToStore();
    });
  }

  saveStateToStore () {
    const removeDragFromOutlet = draggableOutlet => {
      return (
        <Outlet key={draggableOutlet.key} name={draggableOutlet.props.name} />
      )
    };
    window.interactive = {
      bucket: this.state.bucket.map(removeDragFromOutlet),
      [Zones.Left]: this.state[Zones.Left].map(removeDragFromOutlet),
      [Zones.LeanLeft]: this.state[Zones.LeanLeft].map(removeDragFromOutlet),
      [Zones.Center]: this.state[Zones.Center].map(removeDragFromOutlet),
      [Zones.LeanRight]: this.state[Zones.LeanRight].map(removeDragFromOutlet),
      [Zones.Right]: this.state[Zones.Right].map(removeDragFromOutlet),
    };
  }
};

Interactive.displayName = 'Interactive';

export default Interactive;

/*
 * Imports.
 */

// NPM.
import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import classNames from 'classnames';

// Local.
import Outlet from '../../components/outlet';
import { Zones } from '../../zones';

/*
 * Members.
 * @see http://react-dnd.github.io/react-dnd/docs-drop-target.html.
 */
const spec = {
  canDrop (props, monitor) {
    // As long as the item type matches, allow drop.
    return true;
  },
  drop (props, monitor, component) {
    // Return an object that will be available as monitor.getDropResult()
    // in the drag source's endDrag() method.
    return { destination: props.title };
  }
};

function collect(connect, monitor) {
  return {
    // Call this function inside render() to let React DnD handle the drag events:
    connectDropTarget: connect.dropTarget(),
    // You can ask the monitor about the current drag state:
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  };
}

/*
 * The Drop Zone class.
 */
class DropZone extends Component {
  render () {
    // The component receives its own props as usual.
    const { title } = this.props;

    // These props are injected by React DnD,
    // as defined by the `collect` function above:
    const { connectDropTarget, isOver, canDrop } = this.props;

    const zoneClass = classNames('drop-zone', {
      'drop-over': isOver && canDrop,
      'drop-available': !isOver && canDrop,
    });
    const titleClass = classNames('capitalize', {
      'lean-left': title === Zones.Left,
      'lean-lean-left': title === Zones.LeanLeft,
      'lean-center': title === Zones.Center,
      'lean-lean-right': title === Zones.LeanRight,
      'lean-right': title === Zones.Right,
    });

    return connectDropTarget(
      <div className="drop-zone-container">
        <span className={titleClass}>{title}</span>
        <div className={zoneClass}>
          { this.props.outlets }
        </div>
      </div>
    );
  }
};

DropZone.displayName = 'DropZone';

export default DropTarget(
  Outlet.displayName,
  spec,
  collect
)(DropZone);

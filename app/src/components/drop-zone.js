/*
 * Imports.
 */

// NPM.
import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';

// Local.
import Outlet from './outlet';

/*
 * Members.
 * @see http://react-dnd.github.io/react-dnd/docs-drop-target.html.
 */
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',

    height: '100%',
    width: '5vw',
  },
  title: {
    textTransform: 'capitalize',
  },
  dropTarget: {
    width: '100%',
    height: '100%',
  },
}

const spec = {
  canDrop (props, monitor) {
    // As long as the item type matches, allow drop.
    return true;
  },
  drop (props, monitor, component) {
    // Obtain the dragged item
    const item = monitor.getItem();

    // TODO: Do something with it.

    // And return an object that will be available as monitor.getDropResult()
    // in the drag source's endDrag() method.
    return {};
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
    // Your component receives its own props as usual
    const { title } = this.props;

    // These props are injected by React DnD,
    // as defined by your `collect` function above:
    const { connectDropTarget, isOver, canDrop } = this.props;

    let color;
    if (isOver && canDrop) { color = 'green'; }
    else if (!isOver && canDrop) { color = 'yellow'; }
    else if (isOver && !canDrop) { color = 'red'; }

    const stateStyle = { backgroundColor: color };
    const mergedStyles = Object.assign({}, styles.dropTarget, stateStyle);

    return connectDropTarget(
      <div style={styles.container}>
        <span style={styles.title}>{title}</span>
        <div style={mergedStyles}>
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

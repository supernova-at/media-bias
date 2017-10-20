/*
 * Imports.
 */

// NPM.
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DragSource } from 'react-dnd';

// Local.
import newsImage from '../images/generic-news.png';

/*
 * Members.
 */
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',

    width: '5vw',
    minWidth: '5vw',
    height: '5vw',

    border: 'solid 1px white',
  },
  image: {
    width: '100%',
  },
  name: {
    fontWeight: 'bold',
  },
};

/*
 * The Outlet class.
 */
class Outlet extends Component {
  render() {
    const { name } = this.props;
    const mergedStyles = Object.assign({}, styles.container, this.props.style);
    return (
      <div style={mergedStyles}>
        <img style={styles.image} src={newsImage} alt="news" />
        <span style={styles.name}>{name}</span>
      </div>
    );
  }
};

Outlet.displayName = 'Outlet';

Outlet.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Outlet;

/*
 * The DraggableOutlet class.
 */
const entrySource = {
  beginDrag (props) {
    return {
      name: props.name
    };
  },

  endDrag (props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();

    if (dropResult) {
      console.log('Successful drop!');
    }
  }
};
function collect(connect, monitor) {
  return {
   connectDragSource: connect.dragSource(),
   isDragging: monitor.isDragging()
  }
}

class DragReadyOutlet extends Component {
  render() {
    const { connectDragSource, isDragging } = this.props;
    const styles = {
      cursor: 'pointer',
      opacity: (isDragging) ? 0.4 : 1,
    };

    return (
      <Outlet {...this.props}
        style={styles}
        ref={instance => connectDragSource(findDOMNode(instance))}
      />
    );
  }
};

export const DraggableOutlet = DragSource(
  Outlet.displayName,
  entrySource,
  collect
)(DragReadyOutlet);

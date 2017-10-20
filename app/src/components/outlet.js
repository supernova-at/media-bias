/*
 * Imports.
 */

// NPM.
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DragSource } from 'react-dnd';

// Local.
import './outlet.css';
import newsImage from '../images/generic-news.png';

/*
 * The Outlet class.
 */
class Outlet extends Component {
  render() {
    const { name, style } = this.props;

    return (
      <div className="outlet" style={style}>
        <img src={newsImage} alt="news" />
        <span>{name}</span>
      </div>
    );
  }
};

Outlet.displayName = 'Outlet';

Outlet.propTypes = {
  name: PropTypes.string.isRequired,
  style: PropTypes.object,
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

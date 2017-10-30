/*
 * Imports.
 */

// NPM.
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DragSource } from 'react-dnd';
import classnames from 'classnames';

// Local.
import './outlet.css';
import newsImage from '../images/news.png';

/*
 * The Outlet class.
 */
class Outlet extends Component {
  render() {
    const { isDragging, name } = this.props;

    const outletClass = classnames('outlet', {
      'isDragging': isDragging,
    });

    return (
      <div className={outletClass}>
        <img src={newsImage} alt="news" />
        <span>{name}</span>
      </div>
    );
  }
};

Outlet.displayName = 'Outlet';

Outlet.propTypes = {
  isDragging: PropTypes.bool,
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
      props.onDragEnd(item.name, dropResult.destination);
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

    return (
      <Outlet {...this.props}
        isDragging={isDragging}
        ref={instance => connectDragSource(findDOMNode(instance), { dropEffect: 'copy' })}
      />
    );
  }
};

export const DraggableOutlet = DragSource(
  Outlet.displayName,
  entrySource,
  collect
)(DragReadyOutlet);

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
import { sources as definitions } from '../../data/bias.json';
import newsImage from '../../images/news.png';
import checkImage from '../../images/icons8-ok.png';
import xImage from '../../images/icons8-x.png';

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
        <img src={this._image} alt={name} />
      </div>
    );
  }

  constructor (...args) {
    super(...args);

    // Set the image.
    const target = definitions.find(o => o.name === this.props.name);
    this._image = (target && target.image) ? require(`../../images/outlets/${target.image}`) : newsImage;
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

/*
 * The SelectableOutlet Class.
 */
class SelectableOutlet extends Component {
  render () {
    return (
      <div className="selectable-outlet" onClick={this.toggleSelect}>
        { this.state.selected && (
          <div className="selected-outlet">
            <img src={checkImage} alt="news" />
          </div>
        )}
        <Outlet {...this.props} />
      </div>
    );
  }

  constructor (...args) {
    super(...args);

    // Initialize state.
    this.state = { selected: false };

    // Bind functions.
    this.toggleSelect = this.toggleSelect.bind(this);
  }

  toggleSelect = () => {
    const { name, onClick } = this.props;

    ga('send', 'event', {
      eventCategory: 'Current Diet',
      eventAction: (this.state.selected) ? 'Outlet Deselected' : 'Outlet Selected',
      eventLabel: 'Outlet Name',
      eventValue: name,
    });

    this.setState({ selected: !this.state.selected }, () => onClick(name));
  }
};

SelectableOutlet.propTypes = {
  onClick: PropTypes.func.isRequired,
}

const CorrectAnswerOutlet = ({ name }) => (
  <div className="answer-outlet">
    <div className="answer-image-container">
      <img className="answer-image" src={checkImage} alt="correct" />
    </div>
    <Outlet name={name} />
  </div>
);
CorrectAnswerOutlet.displayName = 'CorrectAnswerOutlet';

const IncorrectAnswerOutlet = ({ name }) => (
  <div className="answer-outlet">
    <div className="answer-image-container">
      <img className="answer-image" src={xImage} alt="incorrect" />
    </div>
    <Outlet name={name} />
  </div>
);
IncorrectAnswerOutlet.displayName = 'IncorrectAnswerOutlet';

const ShowingCorrectAnswerOutlet = ({ name }) => (
  <div className="show-correct-answer">
    <Outlet name={name} />
  </div>
);
ShowingCorrectAnswerOutlet.displayName = 'ShowingCorrectAnswerOutlet';

export {
  SelectableOutlet,
  CorrectAnswerOutlet,
  IncorrectAnswerOutlet,
  ShowingCorrectAnswerOutlet
};

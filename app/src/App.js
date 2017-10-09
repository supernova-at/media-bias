/*
 * Imports.
 */

// NPM.
import React, { Component } from 'react';
import { DragDropContext, DragSource } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

// Local.
import './App.css';
import { sources as bias } from './data/bias.json';
import newsImage from './images/generic-news.png';
import Pager from './containers/pager';
import Page from './components/page';

/*
 * Members.
 */
const ItemTypes = {
  Outlet: 'outlet',
};

/**
 * The Application root.
 */
class App extends Component {
  render() {
    return (
      <Pager>
        <Page>Hello World</Page>
        <Page>Goodbye World</Page>
      </Pager>
    );
  }
};

/*
 * List.
 */
class List extends Component {
  render () {
    const { data } = this.props;
    const entries = data.map((entry, index) => {
      return <Entry biasObj={entry} key={index} />;
    });

    return (
      <ul>
        {entries}
      </ul>
    );
  }
};

/*
 * Entry.
 */
const entrySource = {
  beginDrag(props) {
    return {};
  }
};
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}
const EntryComponent = (props) => {
  const { biasObj, connectDragSource, isDragging } = props;
  return connectDragSource(
    <li style={{cursor: 'pointer'}}>
      <img src={newsImage} alt="news" />
      {biasObj.name}: {biasObj.bias}
    </li>
  );
};
const Entry = DragSource(ItemTypes.Outlet, entrySource, collect)(EntryComponent);

export default DragDropContext(HTML5Backend)(App);

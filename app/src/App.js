/*
 * Imports.
 */

// NPM.
import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

// Local.
import './App.css';
import { sources as bias } from './data/bias.json';
import Pager from './containers/pager';

// The pages.
import Welcome from './containers/welcome';
import InteractiveTutorial from './components/interactive-tutorial';
import Interactive from './containers/interactive';

/**
 * The Application root.
 */
class App extends Component {
  render() {
    return (
      <Pager>
        <Welcome />
        <InteractiveTutorial />
        <Interactive />
      </Pager>
    );
  }
};

App.displayName = 'App';

export default DragDropContext(HTML5Backend)(App);

/*
 * Imports.
 */

// NPM.
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

// Local.
import './App.css';
import Pager from './containers/pager';

// The pages.
import Welcome from './containers/welcome';
import CurrentDiet from './containers/current-diet';
import InteractiveTutorial from './components/interactive-tutorial';
import Interactive from './components/interactive';

/**
 * The Application root.
 */
class App extends Component {
  render () {
    return (
      <Pager>
        <Welcome />
        <CurrentDiet />
        <InteractiveTutorial />
        <Interactive />
      </Pager>
    );
  }

  constructor (...args) {
    super(...args);

    // Initialize State.
    this.state = { diet: [] };

    // Bind functions.
    this.toggleOutletInDiet = this.toggleOutletInDiet.bind(this);
  }

  getChildContext () {
    return {
      diet: this.state.diet,
      toggleOutletInDiet: this.toggleOutletInDiet,
    }
  }

  /**
   * Update diet to include outlet or not.
   * @param  {String} name    - The target outlet.
   */
  toggleOutletInDiet = (name) => {
    const index = this.state.diet.indexOf(name);
    let mutatableDiet = [...this.state.diet];
    if (index >= 0) {
      // This outlet is in diet, remove it.
      mutatableDiet.splice(index, 1);
    }
    else {
      // This outlet is not in diet, add it.
      mutatableDiet.push(name);
    }

    this.setState({ diet: mutatableDiet });
  }
};

App.displayName = 'App';

App.childContextTypes = {
  diet: PropTypes.array,
  toggleOutletInDiet: PropTypes.func,
};

export default DragDropContext(HTML5Backend)(App);

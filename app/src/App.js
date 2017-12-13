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
import './common.css';
import Pager from './components/pager';
import MobileView from './containers/mobile-view';

// The pages.
import Introduction from './containers/introduction';
import FakeNews from './containers/fake-news';
import CurrentDiet from './containers/current-diet';
import RecommendedDiet from './containers/recommended-diet';
import InteractiveTutorial from './containers/interactive-tutorial';
import Interactive from './containers/interactive';
import InteractiveAnswers from './containers/interactive/answers';
import NewsCopy from './containers/news-copy';
import Ending from './containers/ending';

// Data.
import * as Copy from './data/news-copy';

/**
 * The Application root.
 */
class App extends Component {
  render () {
    return (window.innerWidth > 1024) ? (
      <Pager>
        { /* Intro */ }
        <Introduction />

        { /* Current Diet */ }
        <CurrentDiet />

        { /* Defining Terms */ }
        <FakeNews />
        <NewsCopy source={Copy.SeekingUnbiased} />
        <NewsCopy source={Copy.PersonalSteps} />

        { /* Interactive Experience */ }
        <InteractiveTutorial />
        <Interactive />

        { /* Interactive Experience Answers */ }
        <InteractiveAnswers />

        { /* Next Steps */ }
        <RecommendedDiet />

        { /* End */ }
        <Ending />
      </Pager>
    ) : (
      <MobileView />
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

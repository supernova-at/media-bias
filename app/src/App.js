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
import Pager from './components/pager';

// The pages.
import CurrentDiet from './containers/current-diet';
import RecommendedDiet from './containers/recommended-diet';
import InteractiveTutorial from './containers/interactive-tutorial';
import Interactive from './containers/interactive';
import InteractiveAnswers from './containers/interactive/answers';
import NewsCopy from './containers/news-copy';

// Data.
import * as Copy from './data/news-copy';

/**
 * The Application root.
 */
class App extends Component {
  render () {
    return (
      <Pager>
        <NewsCopy source={Copy.Welcome} />
        <NewsCopy source={Copy.CurrentDietIntro } />
        <CurrentDiet />
        <NewsCopy source={Copy.Introduction} />
        <NewsCopy source={Copy.FakeVsBias} />
        <NewsCopy source={Copy.InteractiveIntro} />
        <InteractiveTutorial />
        <Interactive />
        <NewsCopy source={Copy.SeekingUnbiased} />
        <NewsCopy source={Copy.UnbiasedAction} />
        <NewsCopy source={Copy.IdentifyingMediaBias} />
        <NewsCopy source={Copy.AnswersIntro} />
        <InteractiveAnswers />
        <NewsCopy source={Copy.PersonalSteps} />
        <RecommendedDiet />
        <NewsCopy source={Copy.FightPersonalBias} />
        <NewsCopy source={Copy.Patreon} />
        <NewsCopy source={Copy.Sources} />
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

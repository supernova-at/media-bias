/*
 * Imports.
 */

// NPM.
import React, { Component } from 'react';

// Local.
// Styles.
import './index.css';
// Components.
import DropZone from './drop-zone';
import {
  CorrectAnswerOutlet,
  IncorrectAnswerOutlet,
  ShowingCorrectAnswerOutlet,
} from '../../components/outlet';
// Data.
import { sources as bias } from '../../data/bias.json';
import { Zones } from '../../zones';

/*
 * Members.
 */
const TICK_INTERVAL = 1500; // ms
const Actions = {
  Correct: 'correct',
  Incorrect: 'incorrect',
  RemoveIncorrect: 'removeIncorrect',
  ShowCorrect: 'showCorrect',
};

/*
 * The Interactive Component.
 */
class InteractiveAnswers extends Component {
  render () {
    const {
      [Zones.Left]: left,
      [Zones.LeanLeft]: leanleft,
      [Zones.Center]: center,
      [Zones.LeanRight]: leanright,
      [Zones.Right]: right,
    } = this.state;

    return (
      <div className="interactive">
        <div className="drop-zones-answers">
          <DropZone title={Zones.Left} outlets={left} />
          <DropZone title={Zones.LeanLeft} outlets={leanleft} />
          <DropZone title={Zones.Center} outlets={center} />
          <DropZone title={Zones.LeanRight} outlets={leanright} />
          <DropZone title={Zones.Right} outlets={right} />
        </div>
      </div>
    );
  }

  componentDidMount () {
    setTimeout(() => {
      this.tick();
      this.interval = setInterval(this.tick, TICK_INTERVAL);
    }, TICK_INTERVAL / 2);
  }
  componentWillUnmount () {
    clearInterval(this.interval);
  }

  constructor (...args) {
    super(...args);

    /*
     * Build up the answer key.
     */
    const isInteractive = el => el.interactive === 'true';
    const outlets = bias.filter(isInteractive);

    const isLeft = el => el.bias === Zones.Left;
    const isLeanLeft = el => el.bias === Zones.LeanLeft;
    const isCenter = el => el.bias === Zones.Center;
    const isLeanRight = el => el.bias === Zones.LeanRight;
    const isRight = el => el.bias === Zones.Right;

    const answerKey = {
      [Zones.Left]: outlets.filter(isLeft),
      [Zones.LeanLeft]: outlets.filter(isLeanLeft),
      [Zones.Center]: outlets.filter(isCenter),
      [Zones.LeanRight]: outlets.filter(isLeanRight),
      [Zones.Right]: outlets.filter(isRight),
    };

    /*
     * Build up the 'answerSteps', a list of instructions for comparing
     * the user's answers against the answer key.
     */
    const userAnswers = window.interactive;

    this.answerSteps = []
    const corrections = [];
    Object.keys(userAnswers).forEach(key => {
      if (key === 'bucket') return;

      const zoneValues = userAnswers[key];
      zoneValues.forEach(value => {
        const { name } = value.props;

        // If this matches the answer key, add a "correct" step.
        // If not, add an "incorrect" step.
        const match = answerKey[key].find(el => el.name === name);
        if (match) {
          this.answerSteps.push({
            zone: key,
            name,
            action: Actions.Correct,
          });
        }
        else {
          // This answer was incorrect. Determine its rightful place.
          let actualKey;
          Object.keys(answerKey).forEach(aKey => {
            if (answerKey[aKey].find(el => el.name === name)) {
              actualKey = aKey;
            }
          });

          this.answerSteps.push({
            zone: key,
            name,
            action: Actions.Incorrect
          });
          corrections.push({
            zone: key,
            name,
            action: Actions.ShowCorrect,
            show: actualKey
          });
        }
      });
    });
    this.answerSteps.push({ action: Actions.RemoveIncorrect });
    this.answerSteps = this.answerSteps.concat(corrections);

    // Initialize State - merge the answer key with the user choices
    // saved from a previous screen.
    this.state = Object.assign({ index: 0 }, window.interactive);
    this.maxIndex = this.answerSteps.length - 1;

    // Bind methods.
    this.tick = this.tick.bind(this);
  }

  tick () {
    if (this.state.index <= this.maxIndex) {
      const instruction = this.answerSteps[this.state.index];
      const { zone, name, action, show } = instruction;
      let updatedSourceZone;
      let updatedDestinationZone;
      let removeIncorrect = false;

      switch (action) {
        case Actions.Correct:
          updatedSourceZone = this.state[zone].map(outlet => {
            return (outlet.props.name === name) ?
              <CorrectAnswerOutlet key={name} name={name} /> :
              outlet;
          });
          break;

        case Actions.Incorrect:
          updatedSourceZone = this.state[zone].map(outlet => {
            return (outlet.props.name === name) ?
              <IncorrectAnswerOutlet key={name} name={name} /> :
              outlet;
          });
          break;

        case Actions.ShowCorrect:
          updatedDestinationZone = this.state[show].concat([
            <ShowingCorrectAnswerOutlet key={name} name={name} />
          ]);
          break;

        case Actions.RemoveIncorrect:
          removeIncorrect = true;
          break;

        default: break;
      }

      this.setState((prevState) => {
        let newState = { index: this.state.index + 1 };

        if (updatedSourceZone) {
          newState = Object.assign(newState, { [zone]: updatedSourceZone });
        }

        if (updatedDestinationZone) {
          newState = Object.assign(newState, { [show]: updatedDestinationZone });
        }

        if (removeIncorrect) {
          const remove = el => el.type.displayName !== IncorrectAnswerOutlet.displayName;

          newState = Object.assign(newState, {
            [Zones.Left]: prevState[Zones.Left].filter(remove),
            [Zones.LeanLeft]: prevState[Zones.LeanLeft].filter(remove),
            [Zones.Center]: prevState[Zones.Center].filter(remove),
            [Zones.LeanRight]: prevState[Zones.LeanRight].filter(remove),
            [Zones.Right]: prevState[Zones.Right].filter(remove),
          });
        }

        return newState;
      });
    }
    else {
      clearInterval(this.interval);
    }
  }
};

InteractiveAnswers.displayName = 'InteractiveAnswers';

export default InteractiveAnswers;

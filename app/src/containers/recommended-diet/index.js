/*
 * Imports.
 */

// NPM.
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// Local.
import './recommended-diet.css';
import Outlet from '../../components/outlet';
import Recommender from './recommender';
import { Zones } from '../../zones';

// Members.
const heading = `Balancing your diet`;
const subheading = `Here's our recommendation for you`;

/*
 * RecommendedDiet class.
 */
class RecommendedDiet extends Component {
  render () {
    const recommendations = this._recommendation.map(outlet => {
      return <Outlet key={outlet.name} name={outlet.name} />;
    });
    let currentDiet = this.context.diet.map(outletName => (
      <Outlet key={outletName} name={outletName} />
    ));

    const leanClass = classnames('the-lean show1', {
      'lean-left': this._lean === Zones.Left,
      'lean-lean-left': this._lean === Zones.LeanLeft,
      'lean-center': this._lean === Zones.Center,
      'lean-lean-right': this._lean === Zones.LeanRight,
      'lean-right': this._lean === Zones.Right,
    });
    const showReccos = recommendations.length > 0;

    return (
      <div className="newspaper-copy">
        <h1 className="newspaper-heading">{heading}</h1>
        <h3 className="newspaper-subheading">{subheading}</h3>
        <div>
          <div className="recco-pair">
            <h2>
              <span>Your current diet is&nbsp;</span>
              <span className={leanClass}>
                {this._lean}
              </span>
              <span className="show1">&nbsp; (with {this._deviation} deviation).</span>
            </h2>
            <div className="recco-outlets-list show0">{currentDiet}</div>
          </div>
          <div className="recco-pair show2">
            <h2>You should consider reading:</h2>
            <div className="recco-outlets-list">
              {showReccos && recommendations}
              {!showReccos && (
                <span className="recco-na">N/A</span>
              )}
            </div>
          </div>
        </div>
      </div>
    );

    // return (
    //   <div>
    //     <h3>Diet</h3>
    //     <div>{ this.context.diet.join(', ') }</div>
    //     <h3>Lean</h3>
    //     <div>{ this._lean }</div>
    //     <h3>Deviation</h3>
    //     <div>{ this._deviation }</div>
    //     <h3>Recommendation</h3>
    //     <div>{ recommendations }</div>
    //   </div>
    // );
  }

  constructor (...args) {
    super(...args);

    const { lean, deviation, recommendation } = Recommender(this.context.diet);

    this._lean = lean;
    this._deviation = deviation;
    this._recommendation = recommendation;
  }
};

RecommendedDiet.displayName = 'RecommendedDiet';

RecommendedDiet.contextTypes = {
  diet: PropTypes.array,
};

export default RecommendedDiet;

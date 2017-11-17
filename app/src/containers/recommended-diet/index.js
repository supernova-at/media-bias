/*
 * Imports.
 */

// NPM.
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Local.
import Outlet from '../../components/outlet';
import Recommender from './recommender';

/*
 * RecommendedDiet class.
 */
class RecommendedDiet extends Component {
  render () {
    const recommendations = this._recommendation.map(outlet => {
      return <Outlet key={outlet.name} name={outlet.name} />;
    });

    return (
      <div>
        <h3>Diet</h3>
        <div>{ this.context.diet.join(', ') }</div>
        <h3>Lean</h3>
        <div>{ this._lean }</div>
        <h3>Deviation</h3>
        <div>{ this._deviation }</div>
        <h3>Recommendation</h3>
        <div>{ recommendations }</div>
      </div>
    );
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

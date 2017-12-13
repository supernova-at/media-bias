/*
 * Imports.
 */

// Local.
import { sources as data } from '../../data/bias.json';
import { Zones } from '../../zones';

/*
 * Members.
 */
const Scores = {
  [Zones.Left]: 1,
  [Zones.LeanLeft]: 2,
  [Zones.Center]: 3,
  [Zones.LeanRight]: 4,
  [Zones.Right]: 5,
};
const Leans = {
  1: Zones.Left,
  2: Zones.LeanLeft,
  3: Zones.Center,
  4: Zones.LeanRight,
  5: Zones.Right,
}
const HighBar = 1; // Reasonable guess for now. TODO: what should this be?
export const Deviations = {
  High: 'high',
  Low: 'low',
};

const PersonalLeanRight = ['Wall Street Journal', 'Forbes'];

/**
 * The Recommender takes the user's current diet, scores it, and makes recommendations.
 * @param {Array} currentDietNames - An array of names of outlets.
 * @returns {Object} with properties lean, deviation, recommendation.
 */
const Recommender = (currentDietNames) => {
  const diet = currentDietNames.map(name => {
    // Map the name of an outlet to its full object.
    return data.filter(outlet => outlet.name === name)[0];
  });

  if (diet.length === 0) {
    return {
      lean: Leans[3],
      deviation: Deviations.Low,
      recommendation: calculateRecommendation(diet, 3),
    };
  }

  const meanAvg = calculateScore(diet) / diet.length;
  const lean = Leans[Math.round(meanAvg)];
  const deviation = calculateDeviation(diet, meanAvg);
  const recommendation = calculateRecommendation(diet, meanAvg);

  return { lean, deviation, recommendation };
};

function calculateScore (diet) {
  return diet.reduce((total, outlet) => {
    // Add this outlet's bias score to the total.
    return total + Scores[outlet.bias];
  }, 0);
}

function calculateDeviation (diet, meanAvg) {
  const differences = diet
    .map((outlet) => {
      // Subtract the mean and square the result.
      return Math.pow(Scores[outlet.bias] - meanAvg, 2);
    })
    .reduce((total, number) => total + number, 0);

  const avgDifferences = differences / diet.length;
  const standardDeviation = Math.sqrt(avgDifferences);

  return (standardDeviation < HighBar) ? Deviations.Low : Deviations.High;
}

/**
 * Recommend 1-2 outlets:
 * one (1) from the center, and one (1) from the opposite side of center.
 * Prefer outlets from the 'interactive' list, which will be the most
 * recognized outlets to users.
 * @param  {Array}  diet - Array of outlet objects in the current diet.
 * @param  {Number} meanAvg - The average score of the diet.
 * @return {Array} - An array of outlet objects.
 */
function calculateRecommendation (diet, meanAvg) {
  const result = [];

  // Only consider outlets that aren't in the current diet.
  const notInDiet = data.filter((outlet) => {
    return diet.indexOf(outlet) === -1;
  });

  /*
   * Recommend from the center, preferring familiar outlets.
   * (marked 'interactive' or 'canRecommend')
   */
  const centerOutlets = notInDiet.filter(o => o.bias === Zones.Center);
  const familiarCenters = centerOutlets.filter(o => o.interactive || o.canReccomend);
  let targetList = (familiarCenters.length > 0) ? familiarCenters : centerOutlets;
  if (targetList.length > 0) {
    const randomIndex = Math.floor(Math.random() * targetList.length);
    result.push(targetList[randomIndex]);
  }

  /*
   * Recommend from the opposite side of center, again preferring familiar outlets.
   */
  // Early out if we're exactly in the center.
  // There is no 'opposite side of center' in this case.
  if (meanAvg === Scores[Zones.Center]) { return result; }

  const oppositeLean = (meanAvg > Scores[Zones.Center]) ? Zones.LeanLeft : Zones.LeanRight;
  const leanOutlets = notInDiet.filter(o => {
    // The data doesn't have many outlets that 'lean right'.
    // Add a couple recommendations based on personal experience.
    if (oppositeLean === Zones.LeanRight) {
      return PersonalLeanRight.indexOf(o.name) >= 0;
    }
    else return o.bias === oppositeLean;
  });
  const familiarLeans = leanOutlets.filter(o => o.interactive || o.canReccomend);
  targetList = (familiarLeans.length > 0) ? familiarLeans : leanOutlets;
  if (targetList.length > 0) {
    const randomIndex = Math.floor(Math.random() * targetList.length);
    const recommendation = targetList[randomIndex];

    // Be sure outlets don't get added more than once.
    // This can happen when we're recommending outlets that 'lean right', because
    // we add them manually without checking if they're already present.
    if (result.indexOf(recommendation) === -1) {
      result.push(recommendation);
    }
  }

  return result;
}

export default Recommender;

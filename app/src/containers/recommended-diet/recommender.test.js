import Recommender from './recommender';

it.only('lets me test', () => {
  const input = ['New York Times', 'Washington Post'];
  const output = Recommender(input);

  console.log('output', output);
});

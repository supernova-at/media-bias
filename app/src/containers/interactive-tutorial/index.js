import React from 'react';
import tutorialImage from '../../images/tutorial.gif';
import { InteractiveTutorial as Copy } from '../../data/news-copy';

export default () => (
  <div className="newspaper-copy">
    <h1 className="newspaper-heading">
      { Copy.heading }
    </h1>
    <h3 className="newspaper-subheading">
      { Copy.subheading }
    </h3>
    <div style={{ display: 'flex', justifyContent: 'center', height: '410px', maxHeight: '410px' }}>
      <img style={{ height: '100%' }} src={tutorialImage} alt="interactive tutorial" />
    </div>
  </div>
);

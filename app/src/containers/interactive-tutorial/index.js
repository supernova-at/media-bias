import React from 'react';
import tutorialImage from '../../images/tutorial.gif';
import { InteractiveTutorial as Copy } from '../../data/news-copy';

export default () => (
  <div className="newspaper-copy">
    <h1 className="newspaper-heading">
      { Copy.heading }
    </h1>
    <h2 className="newspaper-subheading">
      { Copy.subheading }
    </h2>
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <img src={tutorialImage} />
    </div>
  </div>
);

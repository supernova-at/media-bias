import React from 'react';
import tutorialImage from '../../images/tutorial.gif';

export default () => (
  <div className="newspaper-copy">
    <h1 className="newspaper-heading">
      Rate the bias of these outlets
    </h1>
    <h2 className="newspaper-subheading">
      Drag & Drop outlets onto the bias spectrum
    </h2>
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <img src={tutorialImage} />
    </div>
  </div>
);

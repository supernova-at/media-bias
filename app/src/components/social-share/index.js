import React from 'react';
import propTypes from 'prop-types';

import * as Resources from '../../data/consts';

export const Platforms = {
  Facebook: 'facebook',
  Twitter: 'twitter',
};
export const Icon_Sizes = {
  Small: '32',
  Large: '48',
}; 

const SocialShare = ({ platform, size }) => {
  const { FBShare, TwitterShare } = Resources;
  const fbImage = `https://png.icons8.com/facebook/color/${size}/000000`;
  const twitterImage = `https://png.icons8.com/twitter/color/${size}/000000`;

  return (platform === Platforms.Facebook) ? (
    <a href={FBShare} target="_blank" rel="noopener noreferrer" onClick={() => {
      window.ga('send', 'event', {
        eventCategory: 'Social Share',
        eventAction: 'Facebook Clicked',
      });
    }}>
      <img src={fbImage} alt="facebook icon" />
    </a>
  ) : (
    <a href={TwitterShare} target="_blank" rel="noopener noreferrer" onClick={() => {
      window.ga('send', 'event', {
        eventCategory: 'Social Share',
        eventAction: 'Twitter Clicked',
      });
    }}>
      <img src={twitterImage} alt="twitter icon" />
    </a>
  );
}

SocialShare.displayName = 'SocialShare';

SocialShare.propTypes = {
  platform: propTypes.string.isRequired,
  size: propTypes.string,
};

SocialShare.defaultProps = {
  size: Icon_Sizes.Small,
};

export default SocialShare;

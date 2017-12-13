import React from 'react';
import * as Resources from '../../data/consts';

export const Platforms = {
  Facebook: 'facebook',
  Twitter: 'twitter',
};

const SocialShare = ({ platform }) => {
  const { FBShare, TwitterShare } = Resources;

  return (platform === Platforms.Facebook) ? (
    <a href={FBShare} target="_blank" rel="noopener noreferrer">FB</a>
  ) : (
    <a href={TwitterShare} target="_blank" rel="noopener noreferrer">Twitter</a>
  );
}

SocialShare.displayName = 'SocialShare';

export default SocialShare;

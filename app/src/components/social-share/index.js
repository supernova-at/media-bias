import React from 'react';
import * as Resources from '../../data/consts';

export const Platforms = {
  Facebook: 'facebook',
  Twitter: 'twitter',
};

const SocialShare = ({ platform }) => {
  const { FBShare, TwitterShare } = Resources;

  return (platform === Platforms.Facebook) ? (
    <a href={FBShare} target="_blank">FB</a>
  ) : (
    <a href={TwitterShare} target="_blank">Twitter</a>
  );
}

SocialShare.displayName = 'SocialShare';

export default SocialShare;

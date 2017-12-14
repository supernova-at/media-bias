const site_url = 'http://mediabiasexperience.com';
const share_text = `Learn how to navigate media bias and think for yourself: ${site_url} @supernova_at`;

const webLink = encodeURIComponent(site_url);
const shareText = encodeURIComponent(share_text);

const FBShareURL = 'https://www.facebook.com/sharer/sharer.php?u=';
const TwitterShareURL = 'https://twitter.com/intent/tweet?source=';

export const FBShare = `${FBShareURL}${webLink}`;
export const TwitterShare = `${TwitterShareURL}${webLink}&text=${shareText}`;
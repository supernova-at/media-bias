const site_url = 'http://www.mediabiasexperience.com';
const share_text = 'Fake News? Biased News? What you can do to take back control.';

const webLink = encodeURIComponent(site_url);
const shareText = encodeURIComponent(share_text);

const FBShareURL = 'https://www.facebook.com/sharer/sharer.php?u=';
const TwitterShareURL = 'https://twitter.com/intent/tweet?source=';

export const FBShare = `${FBShareURL}${webLink}&t=${shareText}`;
export const TwitterShare = `${TwitterShareURL}${webLink}&text=${shareText}`;

/*
 * Imports.
 */

// NPM.
import React from 'react';
import PropTypes from 'prop-types';

// Local.
import './ending.css';
import SocialShare, { Platforms, Icon_Sizes } from '../../components/social-share';

/*
 * Component.
 */
const Ending = () => (
  <div className="ending-container">
    <h1 className="newspaper-heading">Thanks for playing!</h1>
    { /* Share */ }
    <h3 className="newspaper-subheading">Share this experience</h3>
    <span>
      <SocialShare platform={Platforms.Facebook} size={Icon_Sizes.Large} />
      &nbsp;
      <SocialShare platform={Platforms.Twitter} size={Icon_Sizes.Large} />
    </span>
    
    { /* Donate */ }
    <h3 className="newspaper-subheading">Did you learn something?</h3>
    <span>
      <Link to="https://www.paypal.me/supernovaat/3">
        Cheers me 🥂
      </Link>
    </span>
    
    <div className="ending-row">
      <div>
        { /* Special Thanks */ }
        <h3 className="newspaper-subheading">Special Thanks</h3>
        <div className="sources-list">
          <Link to="http://ncase.me/trust/">Inspired by The Evolution of Trust by Nicky Case</Link>
          <Link to="https://icons8.com">Icon pack by Icons8</Link>
          <Link to="https://www.looperman.com">Sound by Fanto8BC via Looperman</Link>
          <Link to="https://twitter.com/DallasNichole">UX help from @DallasNichole</Link>
        </div>
      </div>

      <div>
        { /* Sources */ }
        <h3 className="newspaper-subheading">Sources</h3>
        <div className="sources-list">
          <Link to="http://reason.com/archives/2015/05/22/theres-no-such-thing-as-unbiased-journal">
            No such thing as unbiased (reason.com)
          </Link>
          <Link to="https://www.weareteachers.com/recognize-bias/">
            How to recognize bias (weareteachers.com)
          </Link>
          <Link to="http://fair.org/take-action-now/media-activism-kit/how-to-detect-bias-in-news-media/">
            How to detect media bias (fair.org)
          </Link>
          <Link to="https://lifesmartblog.com/2015/05/29/5-ways-to-avoid-media-bias-and-form-your-own-opinions/">
            Form your own opinions (lifesmartblog.com)
          </Link>
          <Link to="https://www.huffingtonpost.com/entry/fight-your-own-bias-with-these-three-tips_us_588a64f0e4b0020b224b4303">
            Fighting your own bias (huffingtonpost.com)
          </Link>
          <Link to="https://www.allsides.com/blog/unbiased-news-or-balanced-news-diet-what-do-we-really-want">
            What do we really want? (allsides.com)
          </Link>
          <Link to="https://www.huffingtonpost.com/entry/fake-news-guide-facebook_us_5831c6aae4b058ce7aaba169?section=politics">
            Fake news guide (huffingtonpost.com)
          </Link>
        </div>
      </div>
    </div>
  </div>
);

const Link = ({ to, children }) => (
  <a href={to} target="_blank" rel="noopener noreferrer" onClick={() => {
    window.ga('send', 'event', {
      eventCategory: 'Ending Page',
      eventAction: 'Link Clicked',
      eventLabel: to,
    });
  }}>
    {children}
  </a>
);
Link.propTypes = {
  children: PropTypes.string,
};

Ending.displayName = 'Ending';

export default Ending;

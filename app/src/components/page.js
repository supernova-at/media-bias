/*
 * Imports.
 */

// NPM.
import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * A Page simply displays some content.
 */
class Page extends Component {
  render () {
    return (
      <div>{ this.props.children }</div>
    );
  }
};

Page.displayName = 'Page';

Page.propTypes = {
  children: PropTypes.node,
};

export default Page;

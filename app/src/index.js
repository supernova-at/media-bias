/*
 * Imports.
 */

// NPM.
import React from 'react';
import ReactDOM from 'react-dom';

// Local.
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

/*
 * Logic.
 */
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

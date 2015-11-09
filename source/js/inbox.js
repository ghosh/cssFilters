var React = require('React');
var ReactDOM = require('react-dom');
var App = require('./components/app.jsx');

/**
 * Kickoff the app
 */
ReactDOM.render(
  <App name="World" />,
  document.getElementById('root')
);

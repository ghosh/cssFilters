var React = require('React');
var ReactDOM = require('react-dom');
var App = require('./components/app.jsx');
var Share = require('./share');



var config = {
  'twitter': true,
  'facebook': true,
  'gplus': false,
  'sharecount': false
};

Share.boot(config);


/**
 * Kickoff the app
 */
ReactDOM.render(
  <App />,
  document.getElementById('root')
);

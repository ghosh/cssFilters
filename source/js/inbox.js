var React = require('react');
var ReactDOM = require('react-dom');
var App = require('./components/app.jsx');
var Share = require('./share');


Share.boot({
  'twitter': true,
  'facebook': true,
  'gplus': false,
  'sharecount': false
});


/**
 * Kickoff the app
 */
ReactDOM.render(
  <App />,
  document.getElementById('root')
);


console.log('=====================================================================');
console.log('cssfilters.co - Custom and Instagram like photo filters for CSS');
console.log('=====================================================================');
console.log('A little project by www.twitter.com/_ighosh');

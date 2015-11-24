var $ = require('jquery');

var Track = ( function( window, undefined ) {

  var $twitter = $('#share-twitter');
  var $facebook = $('#share-facebook');
  var $github = $('#share-github');

  function track() {
    $facebook.on('click', function(event) {
      ga('send', 'social', 'facebook', 'share', 'http://www.cssfilters.co/');
    });

    $twitter.on('click', function(event) {
      ga('send', 'social', 'twitter', 'share', 'http://www.cssfilters.co/');
    });

    $github.on('click', function(event) {
      ga('send', 'event', 'header-icons', 'click', 'github');
    });
  }

  return {
    track : track
  };

} )( window );

module.exports = Track;

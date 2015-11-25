var $ = require('jquery');

var Share = ( function( window, undefined ) {

  var config = {
    'twitter': true,
    'facebook': true,
    'gplus': true,
    'sharecount': false
  };

  var $share = document.getElementById('share-buttons');
  var $shareLinks = $share.querySelectorAll('a');
  var $sharecounts = document.getElementsByClassName('share-count');
  var $facebook = document.getElementById('share-facebook');
  var $facebookCount = document.getElementById('facebook-count');
  var $twitter = document.getElementById('share-twitter');
  var $twitterCount = document.getElementById('twitter-count');

  var permalink = $share.getAttribute('data-permalink');


  function _extend(out) {
    out = out || {};

    for (var i = 1; i < arguments.length; i++) {
      if (!arguments[i])
        continue;

      for (var key in arguments[i]) {
        if (arguments[i].hasOwnProperty(key))
          out[key] = arguments[i][key];
      }
    }

    return out;
  };

  function _checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response
    } else {
      var error = new Error(response.statusText)
      error.response = response
      throw error
    }
  }

  function _setVariables ( options ) {
    config = _extend( {}, config, options );
  }

  function _setupShareButtons () {
    if (config.sharecount === true) {
        ( document.contains($facebook) && config.facebook === true ) ? _getFacebookCount() : $facebook.parentNode.removeChild($facebook) ; // jshint ignore:line
        ( document.contains($twitter) && config.twitter === true ) ? _getTwitterCount() : $twitter.parentNode.removeChild($twitter) ; // jshint ignore:line

    } else {
      // Remove share count elements from dom
      while($sharecounts.length > 0){
          $sharecounts[0].parentNode.removeChild($sharecounts[0]);
      }
    }
  }

  function _getFacebookCount () {
      $.getJSON('https://graph.facebook.com/?id='+permalink)
      .done(function(data) {

        if (data.shares > 0) {
          $facebookCount.textContent = data.shares;
          ($facebookCount.classList) ? $facebookCount.classList.add('is-loaded') : $facebookCount.className += ' ' + 'is-loaded' ;
        } else {
          $facebookCount.parentNode.removeChild($facebookCount);
        }
      })
      .fail(function(data) {
        $facebookCount.parentNode.removeChild($facebookCount);
      });
  }




  function _getTwitterCount () {

    $.getJSON('https://cdn.api.twitter.com/1/urls/count.json?url=' + permalink + '&callback=?')
    .done(function(data) {

      if (data.count > 0) {
        $twitterCount.textContent = data.count;
        ($twitterCount.classList) ? $twitterCount.classList.add('is-loaded') : $twitterCount.className += ' ' + 'is-loaded' ;
      } else {
        $twitterCount.parentNode.removeChild($twitterCount);
      }
    })
    .fail(function(data) {
      $twitterCount.parentNode.removeChild($twitterCount);
    });

  }

  function _clickHandler(event) {
    event.preventDefault();
    var el = this,
        popup = el.getAttribute('class'),
        link = el.getAttribute('href'),
        w = 700,
        h = 400;

    // Set popup sizes
    switch (popup) {
      case 'js-twitter-link':
        h = 300;
        break;
      case 'js-gplus-link':
        w = 500;
        break;
    }

    window.open(link, popup, 'width=' + w + ', height=' + h);
  }


  function _setupShareModals () {

    for (i = 0; i < $shareLinks.length; ++i) {
      $shareLinks[i].addEventListener('click', _clickHandler);
    }
  }

  function boot( options ) {
    _setVariables( options );
    _setupShareButtons();
    _setupShareModals();
  }

  return {
    boot : boot
  };

} )( window );

module.exports = Share;

var React = require('react');
var $ = require('jquery');
var nanoScroller = require('nanoScroller');
var FilterFactory = require('../../factory');
var dragscroll = require('../../vendor/drag');
var presets = require('../../presets');
var classNames = require('classnames');

var Gallery = React.createClass({

    componentDidMount: function() {
      $('.gallery-scroll').nanoScroller({ alwaysVisible: true });
    },

    enablePreset: function(name, event) {
      this.props.updatePreset(name);
    },

    render: function() {

      var galleryClass = classNames({
        'gallery': true,
        'gallery-scroll': true,
        'is-active': this.props.gallery.visible
      });

      var thumbs = [];
      var self = this;
      Object.keys(presets).forEach(function(key) {
        var name = key;
        var object = presets[key];
        var thumbClass = classNames({
          'thumb': true,
          'is-active': (this.props.preset == key) ? true : false
        });

        var factory = new FilterFactory(object.filter, object.overlay);
        var overlay = factory.getOverlayStyles();
        var filter = factory.getFilterStyles();

        var image = 'https://source.unsplash.com/'+this.props.image.unsplashID+'/100x75';

        thumbs.push(
          <li className="gallery__item" key={name} onClick={this.enablePreset.bind(this, name)}>
            <div className={thumbClass}>
              <figure className="thumb__figure" style={filter}>
                <div style={overlay} />
                <img src={image} alt="" className="thumb__img" />
              </figure>
              <p className="thumb__label">
                {name.replace(/^./, name[0].toUpperCase())}
              </p>
            </div>
          </li>
        );
      }.bind(this));

      return (
        <div className={galleryClass}>
          <div className="gallery__scroll-cont nano-content dragscroll">
            <ul className="gallery__items">
              {thumbs}
            </ul>
          </div>
        </div>
      );
    }
});

module.exports = Gallery;

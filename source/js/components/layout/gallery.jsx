var React = require('React');
var Factory = require('../../factory');
var presets = require('../../presets');
var classNames = require('classnames');

var Gallery = React.createClass({
    render: function() {

      var galleryClass = classNames({
        'gallery': true,
        'is-active': this.props.gallery.visible
      });

      var thumbs = [];

      Object.keys(presets).forEach(function(key) {
        var name = key;
        var object = presets[key];

        var thumbClass = classNames({
          'thumb': true,
        });

        var factory = new Factory(object.filter, object.overlay);
        var overlay = factory.getOverlayStyles();
        var filter = factory.getFilterStyles();

        thumbs.push(
          <li className="gallery__item" key={name}>
            <div className={thumbClass}>
              <figure className="thumb__figure" style={filter}>
                <div style={overlay} />
                <img src="https://source.unsplash.com/W_9mOGUwR08/100x75" alt="" className="thumb__img" />
              </figure>
              <p className="thumb__label">
                {name.replace(/^./, name[0].toUpperCase())}
              </p>
            </div>
          </li>
        );
      });

      return (
        <div className={galleryClass}>
          <ul className="gallery__items">
            {thumbs}
          </ul>
        </div>
      );
    }
});

module.exports = Gallery;

var React = require('React');
var presets = require('../../presets');
var classNames = require('classnames');

var Gallery = React.createClass({
    render: function() {

      var galleryClass = classNames({
        'gallery': true,
        'is-active': this.props.gallery.visible
      });

      var thumbs = [];
      for (var key in presets) {
         if (presets.hasOwnProperty(key)) {
             var thumbClass = classNames({
               'thumb': true,
             });
             thumbs.push(
               <li className="gallery__item" key={key}>
                 <div className={thumbClass}>
                   <figure className="thumb__figure">
                     <img src="https://source.unsplash.com/W_9mOGUwR08/100x75" alt="" className="thumb__img" />
                   </figure>
                   <p className="thumb__label">
                     {key.replace(/^./, key[0].toUpperCase())}
                   </p>
                 </div>
               </li>
             )
          }
      }

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

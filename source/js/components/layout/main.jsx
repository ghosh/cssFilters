var React = require('React');
var Photo = require('../photo.jsx');

var Main = React.createClass({
    render: function() {

      if (this.props.gallery.visible) {
        var galleryTriggerText = 'Hide Presets'
      } else {
        var galleryTriggerText = 'Show Presets'
      }

      return (
        <main className="main">
          <Photo overlay={this.props.overlay} filter={this.props.filter} />
          <p className="gallery__trigger" onClick={this.props.toggleGallery}>
            {galleryTriggerText}
          </p>
        </main>
      )
    }
});

module.exports = Main;

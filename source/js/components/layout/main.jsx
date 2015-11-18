var React = require('React');
var Photo = require('../photo.jsx');
var UnsplashModal = require('../unsplashmodal.jsx');
var UploadModal = require('../uploadmodal.jsx');


var Main = React.createClass({
  render: function() {

    if (this.props.gallery.visible) {
      var galleryTriggerText = 'Hide Presets'
    } else {
      var galleryTriggerText = 'Show Presets'
    }

    return (
      <main className="main">
        <section className="modal__trigger-cont">
          <UnsplashModal updateMainImage={this.props.updateMainImage} />
          <UploadModal updateMainImage={this.props.updateMainImage} />
        </section>
        <Photo overlay={this.props.overlay} filter={this.props.filter} image={this.props.image}/>
        <p className="gallery__trigger" onClick={this.props.toggleGallery}>{galleryTriggerText}</p>
      </main>
    )
  }
});

module.exports = Main;

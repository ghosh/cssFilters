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
          <p className="gallery__trigger" onClick={this.props.toggleGallery}><i className="icon-settings"/>{galleryTriggerText}</p>
        </section>

        <Photo overlay={this.props.overlay} filter={this.props.filter} image={this.props.image}/>

        <div className="credits">
          <p className="credits__cite">Built by <a href="#">@_ighosh</a>. Presets by <a href="#">@una</a></p>
        </div>
      </main>
    )
  }
});

module.exports = Main;

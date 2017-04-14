var React = require('react');
var ReactModal = require('react-modal');
var Dropzone = require('react-dropzone');

var UploadModal = React.createClass({

  getInitialState: function() {
    return {
      modalIsOpen: false,
      files: []
    };
  },

  setMainImage: function(src) {
    this.props.updateMainImage('upload', src)
  },

  onDrop: function (files) {
    this.setState({
      files: files
    });
    this.setMainImage(files[0].preview);
    this.closeModal();
  },

  openModal: function() {
    this.setState({modalIsOpen: true});
  },

  closeModal: function() {
    this.setState({modalIsOpen: false});
  },

  render: function() {

    var modalStyles = {
      content : {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '640px',
        height: '500px',
        overlfow: 'scroll',
        'border': 'transparent',
        'backgroundColor': '#191d23'
      },
      overlay: {
        backgroundColor: 'rgba(46, 47, 49, 0.701961)'
      }
    };

    return (
      <div>
        <p className="modal__trigger" onClick={this.openModal}><i className="icon-upload"/> Upload an Image</p>
        <ReactModal className="modal" isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} style={modalStyles} >
          <div className="modal__header">
            <h4 className="modal__title">
              Upload an Image
            </h4>
            <a href="#" className="modal__close icon-close" onClick={this.closeModal}></a>
          </div>
          <div className="modal__body">
            <div className="nano-content modal__scroll-cont">
            <Dropzone ref="dropzone" className="dropzone" onDrop={this.onDrop} multiple={false}>
                <p className="dropzone__byline">Drag and drop an image here, or click to select from drive.</p>
            </Dropzone>
          </div>
          </div>
        </ReactModal>
      </div>
    );
  }
});

module.exports = UploadModal;

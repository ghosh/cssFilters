var React = require('React');
var ReactModal = require('react-modal');
require('es6-promise').polyfill();
require('isomorphic-fetch');

var Modal = React.createClass({

  getInitialState: function() {
    return { modalIsOpen: false };
  },

  openModal: function() {
    this.setState({modalIsOpen: true});
  },

  closeModal: function() {
    this.setState({modalIsOpen: false});
  },

  setUnsplashImage: function(id, event) {
    this.props.updateMainImage('unsplash', id);
    this.setState({modalIsOpen: false});
  },

  componentDidMount: function() {

    fetch('https://api.unsplash.com/photos/?per_page=50&client_id=86f6167ee81be7b8aea6aa0d999c1bae79b3351b43e8df03c8baaa9c630f24ba')
      .then(function(res) {
          return res.json();
      }).then(function(json) {
        if (this.isMounted()) {
          this.setState({images: json });
        }
      }.bind(this));

  },

  shouldComponentUpdate: function(nextProps, nextState){
      return this.state !== nextState;
  },

  render: function() {

    if (this.state.images) {
      var images = this.state.images.map(function(image, index){
        return (
          <figure className="modal__thumb" key={index} onClick={this.setUnsplashImage.bind(this, image.id)}>
            <img className="modal__img" src={image.urls.thumb} alt="" />
          </figure>
        );
      }.bind(this));
    }

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
        <p className="modal__trigger" onClick={this.openModal}><i className="icon-image"/> Select an image from Unsplash</p>
        <ReactModal className="modal" isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} style={modalStyles} >
          <div className="modal__header">
            <h4 className="modal__title">
              Select an image
            </h4>
            <a href="#" className="modal__close icon-close" onClick={this.closeModal}></a>
          </div>
          <div className="modal__body">
            {images}
          </div>
        </ReactModal>
      </div>
    );
  }
});

module.exports = Modal;

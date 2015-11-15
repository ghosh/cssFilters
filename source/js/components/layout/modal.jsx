var React = require('React');
var ReactModal = require('react-modal');

var Modal = React.createClass({

  componentDidMount: function() {
    $.get(this.props.source, function(result) {
      var lastGist = result[0];
      if (this.isMounted()) {
        this.setState({
          username: lastGist.owner.login,
          lastGistUrl: lastGist.html_url
        });
      }
    }.bind(this));
  },

  getInitialState: function() {
    return { modalIsOpen: false };
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
        <p className="modal__trigger" onClick={this.openModal}><i className="icon-image"/> Select an image from Unsplash</p>
        <ReactModal className="modal" isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} style={modalStyles} >
          <div className="modal__header">
            <h4 className="modal__title">
              Select an image
            </h4>
            <a href="#" className="modal__close icon-close" onClick={this.closeModal}></a>
          </div>
        </ReactModal>
      </div>
    );
  }
});

module.exports = Modal;

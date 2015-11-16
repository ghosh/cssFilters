var React = require('React');
var FilterFactory = require('../factory');
var ImageLoader = require('react-imageloader');

var Photo = React.createClass({

  getInitialState: function() {
    return {
      photoLoaded: false
    }
  },

  shouldComponentUpdate: function(nextProps, nextState){
    return this.props.overlay !== nextProps.overlay ||
             this.props.filter !== nextProps.filter ||
             this.props.image !== nextProps.image ||
             this.state != nextState;
  },

  componentWillReceiveProps: function(nextProps) {
    if (this.props.image != nextProps.image) {
      this.setState({photoLoaded: false});
    }
  },

  photoLoaded: function() {
    this.setState({photoLoaded: true});
  },

  preloader: function () {
    return <img className="photo__spinner" src="/images/spinner.gif" />;
  },

  render: function() {

    var img = 'https://source.unsplash.com/'+this.props.image.unsplashID+'/800x600';

    var factory = new FilterFactory(this.props.filter, this.props.overlay);
    var overlay = factory.getOverlayStyles();
    var filter = factory.getFilterStyles();

    // Hides the overlay div to prevent bleeding filter colors on the spinnner
    // if (this.state.photoLoaded == false) {
    //   overlay.display = 'none';
    // } else {
    //   overlay.display = 'block';
    // }

    overlay.display = (this.state.photoLoaded == false) ? 'none' : 'block' ;

    return (
      <div className="photo">
        <figure style={filter}>
          <div style={overlay}/>
          <ImageLoader src={img} className="photo__img" wrapper={React.DOM.div} preloader={this.preloader} onLoad={this.photoLoaded}></ImageLoader>
        </figure>
      </div>
    );
  }
});

module.exports = Photo;

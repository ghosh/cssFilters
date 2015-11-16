var React = require('React');
var Factory = require('../factory');

var Photo = React.createClass({

  shouldComponentUpdate: function(nextProps, nextState){
    return this.props.overlay !== nextProps.overlay ||
             this.props.filter !== nextProps.filter ||
             this.props.image !== nextProps.image;
  },

  render: function() {

    var img = 'https://source.unsplash.com/'+this.props.image.unsplashID+'/800x600';

    var factory = new Factory(this.props.filter, this.props.overlay);
    var overlay = factory.getOverlayStyles();
    var filter = factory.getFilterStyles();
    return (
      <div className="photo">
        <figure style={filter}>
          <div style={overlay} />
          <img src={img} alt="" className="photo__img" />
        </figure>
      </div>
    );
  }
});

module.exports = Photo;

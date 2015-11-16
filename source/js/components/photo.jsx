var React = require('React');
var Factory = require('../factory');

var Photo = React.createClass({
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

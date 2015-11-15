var React = require('React');
var Factory = require('../factory');

var Photo = React.createClass({
    render: function() {

      var img = 'http://i1.wp.com/photos.oliur.com/wp-content/uploads/2015/09/Workspace-Top-Down-View-with-MacBook-Pro.jpg?resize=1200%2C801';

      // var img = 'https://source.unsplash.com/W_9mOGUwR08/800x600';

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

var React = require('React');
var Factory = require('../factory');

var Photo = React.createClass({
    render: function() {

      var factory = new Factory(this.props.filter, this.props.overlay);
      var overlay = factory.getOverlayStyles();
      var filter = factory.getFilterStyles();

      return (
        <div className="photo">
          <figure style={filter}>
            <div style={overlay} />
            <img src="https://source.unsplash.com/W_9mOGUwR08/800x600" alt="" className="photo__img" />
          </figure>
        </div>
      );
    }
});

module.exports = Photo;

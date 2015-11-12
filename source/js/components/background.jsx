var React = require('React');
var Color = require('./Color.jsx');
var OverlayType = require('./OverlayType.jsx');

var Background = React.createClass({
  displayName: 'Background',

  render: function() {
    return (
      <div>
        <OverlayType
          overlayType={this.props.overlay.type}
          updateOverlayType={this.props.updateOverlayType}
        />
        <Color
          overlayColor={this.props.overlay.color}
          updateOverlayColor={this.props.updateOverlayColor}
          label="Color 1"
          colorStop="false"
        />
      </div>
    );
  }
});

module.exports = Background;

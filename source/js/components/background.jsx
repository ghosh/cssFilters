var React = require('React');
var Color = require('./Color.jsx');
var OverlayType = require('./OverlayType.jsx');

var Background = React.createClass({
  displayName: 'Background',

  render: function() {
    return (
      <div>
        <OverlayType
          overlayType={this.props.overlayType}
          updateOverlayType={this.props.updateOverlayType}
        />
        <Color
          overlayColor={this.props.overlayColor}
          updateOverlayColor={this.props.updateOverlayColor}
          label="Background Color"
        />
      </div>
    );
  }
});

module.exports = Background;

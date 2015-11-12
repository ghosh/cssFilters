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
          updateColor={this.props.updateOverlayColor}
          label="Background Color"
          colorStop="false"
        />

        <Color
          overlayColor={this.props.overlay.color1.color}
          updateColor={this.props.updateColor1}
          updateStop={this.props.updateColor1Stop}
          label="Color 1"
          colorStop="true"
          stopValue={this.props.overlay.color1.stop}
        />

        <Color
          overlayColor={this.props.overlay.color2.color}
          updateColor={this.props.updateColor2}
          updateStop={this.props.updateColor2Stop}
          label="Color 2"
          colorStop="true"
          stopValue={this.props.overlay.color2.stop}
        />

      </div>
    );
  }
});

module.exports = Background;

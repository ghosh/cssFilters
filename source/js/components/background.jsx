var React = require('React');
var Color = require('./Color.jsx');
var OverlayType = require('./overlaytype.jsx');
var GradientDirections = require('./gradientdirection.jsx');

var Background = React.createClass({
  displayName: 'Background',

  renderColors: function() {
      if ( this.props.overlay.type == 'solid' ) {
          return (
            <div className="">
              <Color
                overlayColor={this.props.overlay.color}
                updateColor={this.props.updateOverlayColor}
                label="Background Color"
                colorStop="false"
              />
            </div>
          )
      } else if ( this.props.overlay.type == 'linear') {
        return (
          <div className="">
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

            <GradientDirections ref="gradient-direction" />
          </div>
        )
      } else if ( this.props.overlay.type == 'radial' ) {
        return (
          <div className="">
            <p> Hakuna Matata </p>
          </div>
        )
      }
  },

  render: function() {

    return (
      <div>
        <OverlayType
          overlayType={this.props.overlay.type}
          updateOverlayType={this.props.updateOverlayType}
        />

        {this.renderColors()}

      </div>
    );
  }
});

module.exports = Background;

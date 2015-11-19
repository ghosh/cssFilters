var React = require('React');
var Color = require('./Color.jsx');
var OverlayType = require('./overlaytype.jsx');
var GradientDirections = require('./gradientdirection.jsx');
var GradientPositions = require('./gradientposition.jsx');
var GradientSizes = require('./gradientsize.jsx');

var Background = React.createClass({
  displayName: 'Background',

  renderColors: function() {
      if ( this.props.overlay.type == 'solid' ) {
          return (
            <div className="color__cont">
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
            <div className="color__cont">
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

            <GradientDirections ref="gradientsDirection" direction={this.props.overlay.direction} updateGradientPositions={this.props.updateGradientPositions}/>
          </div>

        )
      } else if ( this.props.overlay.type == 'radial' ) {
        return (
          <div className="">
            <div className="color__cont">
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

            <GradientPositions ref="gradientsPosition" position={this.props.overlay.position} updateGradientPositions={this.props.updateGradientPositions}/>
            <GradientSizes ref="gradientsSize" size={this.props.overlay.size} updateGradientPositions={this.props.updateGradientPositions}/>
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

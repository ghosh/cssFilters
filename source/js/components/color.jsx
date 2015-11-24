var React = require('react');
var ColorSwatch = require('./colorswatch.jsx')
ColorStop = require('./colorstop.jsx')

var Color = React.createClass({


    render: function() {

      if (this.props.colorStop == 'true') {
        var colorStop = <ColorStop stopValue={this.props.stopValue} updateStop={this.props.updateStop} />
      }

      return (
        <div className="color">
          <ColorSwatch
            overlayColor={this.props.overlayColor}
            updateColor={this.props.updateColor}
            label={this.props.label}
            colorStop={this.props.colorStop}
          />
          {colorStop}
        </div>
      );

    }
});

module.exports = Color;

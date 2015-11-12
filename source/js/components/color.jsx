var React = require('React');
var ColorSwatch = require('./colorswatch.jsx')
ColorStop = require('./colorstop.jsx')

var Color = React.createClass({


    render: function() {

      if (this.props.colorStop == 'true') {
        var colorStop = <ColorStop />
      }

      return (
        <div className="color">
          <ColorSwatch
            overlayColor={this.props.overlayColor}
            updateOverlayColor={this.props.updateOverlayColor}
            label="Color 1"
            colorStop="false"
          />
          {colorStop}
        </div>
      );

    }
});

module.exports = Color;

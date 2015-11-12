var React = require('React');

var GradientPosition = React.createClass({
    render: function() {

      var positions = [ 'top left', 'top center', 'top right', 'middle left', 'middle center', 'middle right', 'bottom left', 'bottom center', 'bottom right' ];

      var gradientPositions = positions.map(function(position, index){
        return (
          <option value={position} key={index}>{position.replace(/^./, position[0].toUpperCase())}</option>
        );
      });

      return (
        <div className="opts">
          <label>Gradient Position</label>
          <div className="dropdown">
              <select ref="position" name="gradient-position" className="dropdown-select" onChange={this.props.updateGradientPositions} value={this.props.position}>
                {gradientPositions}
              </select>
            </div>
          </div>
      );
    }
});

module.exports = GradientPosition;

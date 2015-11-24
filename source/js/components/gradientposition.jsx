var React = require('react');

var GradientPosition = React.createClass({
    render: function() {

      var positions = [ 'left top', 'center top', 'right top', 'left center', 'center center', 'right center', 'left bottom', 'center bottom', 'right bottom' ];

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

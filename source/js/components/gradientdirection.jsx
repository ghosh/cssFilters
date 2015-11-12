var React = require('React');

var GradientDirection = React.createClass({
    render: function() {

      var directions = [ 'to bottom right', 'to bottom', 'to bottom left', 'to right', 'to left', 'to top right', 'to top', 'to top left' ];

      var gradientDirections = directions.map(function(direction, index){
        return (
          <option value={direction} key={index}>{direction.replace(/^./, direction[0].toUpperCase())}</option>
        );
      });

      return (
        <div className="opts">
          <label>Gradient Diection</label>
          <div className="dropdown">
              <select ref="graident-direction" name="gradient-direction" className="dropdown-select" onChange={this.props.handeUpdate}>
                {gradientDirections}
              </select>
            </div>
          </div>
      );
    }
});

module.exports = GradientDirection;

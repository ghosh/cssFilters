var React = require('react');

var GradientSize = React.createClass({
    render: function() {

      var sizes = [ 'closest-side', 'closest-corner', 'farthest-side', 'farthest-corner' ];

      var gradientSizes = sizes.map(function(size, index){
        return (
          <option value={size} key={index}>{size.replace(/^./, size[0].toUpperCase())}</option>
        );
      });

      return (
        <div className="opts">
          <label>Gradient Size</label>
          <div className="dropdown">
              <select ref="size" name="gradient-size" className="dropdown-select" onChange={this.props.updateGradientPositions} value={this.props.size}>
                {gradientSizes}
              </select>
            </div>
          </div>
      );
    }
});

module.exports = GradientSize;

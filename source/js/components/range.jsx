var React = require('React');

var RangleSlider = React.createClass({
    render: function() {
      return (
        <div className="slider">
          <div className="slider__content">
            <p className="slider__label">{this.props.label}</p>
            <p className="slider__value">{this.props.value}</p>
          </div>
          <input
            ref="range"
            className="range slider__range"
            type="range"
            value={this.props.value}
            min="0"
            max="100"
            step="1"
            onChange={this.props.handleOnChange}
          />
        </div>
      );
    }
});

module.exports = RangleSlider;

var React = require('react');

var RangleSlider = React.createClass({
    render: function() {
      return (
        <div className="slider">
          <div className="slider__content">
            <p className="slider__label">{this.props.label}</p>
            <p className="slider__value">{this.props.value}{this.props.unit}</p>
          </div>
          <input
            ref="range"
            className="range slider__range"
            type="range"
            value={this.props.value}
            min={this.props.min}
            max={this.props.max}
            step="1"
            onChange={this.props.handeUpdate}
          />
        </div>
      );
    }
});

module.exports = RangleSlider;

var React = require('react');

var ColorStop = React.createClass({

  increaseCount: function() {
    this.props.updateStop( parseInt(this.props.stopValue) + 1 )
  },

  decreaseCount: function() {
    this.props.updateStop( parseInt(this.props.stopValue) - 1 )
  },

  render: function() {
    return (
      <div className="color__stop">
        <div className="color__stop-number number">
          <input className="number__input"
            value={parseInt(this.props.stopValue)}
            onChange={this.props.updateStop}
            id="number"
            min="0"
            max="100"
          />
          <div className="number__up" onClick={this.increaseCount}>+</div>
          <div className="number__down" onClick={this.decreaseCount}>-</div>
        </div>
        <p className="color__stop-label">Stop</p>
      </div>
    );
  }
});

module.exports = ColorStop;

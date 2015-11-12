var React = require('React');

var ColorStop = React.createClass({
    render: function() {
      return (
        <div className="color__stop">
          <div className="color__stop-number number">
            <input className="number__input" id="number" min="1" max="100" />
            <div className="number__up">+</div>
            <div className="number__down">-</div>
          </div>
          <p className="color__stop-label">Stop</p>
        </div>
      );
    }
});

module.exports = ColorStop;

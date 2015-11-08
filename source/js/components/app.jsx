var React = require('React');

var App = React.createClass({
    render: function() {
        return (
          <div className="card">
            <p>Hello {this.props.name}</p>
          </div>
        );
    }
});

module.exports = App;

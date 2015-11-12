var React = require('React');
var Photo = require('../photo.jsx');

var Main = React.createClass({
    render: function() {

      return (
        <main className="main">
          <Photo overlay={this.props.overlay} filter={this.props.filter} />
        </main>
      )
    }
});

module.exports = Main;

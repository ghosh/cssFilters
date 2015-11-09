var React = require('React');
var Photo = require('../photo.jsx');

var Main = React.createClass({
    render: function() {

      return (
        <main className="main">
          <Photo filter={this.props.filter} />
        </main>
      )
    }
});

module.exports = Main;

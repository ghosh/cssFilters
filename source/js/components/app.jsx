var React = require('React');
var Sidebar = require('./layout/sidebar.jsx');
var Main = require('./layout/main.jsx');

var App = React.createClass({
    render: function() {
        return (
          <section className="wrap">
            <Main />
            <Sidebar />
          </section>
        );
    }
});

module.exports = App;

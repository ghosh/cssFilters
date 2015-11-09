var React = require('React');
var Sidebar = require('./layout/sidebar.jsx');
var Main = require('./layout/main.jsx');

var App = React.createClass({
    getInitialState: function() {
      return {
        filter: {
          contrast: 100,
          brightness: 100,
          saturate: 100,
          sepia: 0
        }
      }
    },

    handleRangeChange: function() {
      this.setState({
        filter: {
          contrast: this.refs.sidebar.refs.contrast.refs.range.value,
          sepia: this.refs.sidebar.refs.sepia.refs.range.value,
          saturate: this.refs.sidebar.refs.saturate.refs.range.value,
          brightness: this.refs.sidebar.refs.brightness.refs.range.value
        }
      });
    },

    render: function() {
        return (
          <section className="wrap">
            <Main filter={this.state.filter} />
            <Sidebar ref="sidebar" filter={this.state.filter} handleRangeChange={this.handleRangeChange}/>
          </section>
        );
    }
});

module.exports = App;

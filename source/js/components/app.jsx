var React = require('React');
var Sidebar = require('./layout/sidebar.jsx');
var Main = require('./layout/main.jsx');

var App = React.createClass({
    getInitialState: function() {
      return {
        filter: {
          contrast: '100',
          brightness: '100',
          saturate: '100',
          grayscale: '0',
          sepia: '0',
          invert: '0',
          hueRotate: '0',
          blur: '0',
          opacity: '100',
          blend: 'normal'
        },
        overlayType: 'solid'
      }
    },

    handeUpdate: function(event) {
      this.setState({
        filter: {
          contrast: this.refs.sidebar.refs.contrast.refs.range.value,
          saturate: this.refs.sidebar.refs.saturate.refs.range.value,
          brightness: this.refs.sidebar.refs.brightness.refs.range.value,
          sepia: this.refs.sidebar.refs.sepia.refs.range.value,
          grayscale: this.refs.sidebar.refs.grayscale.refs.range.value,
          invert: this.refs.sidebar.refs.invert.refs.range.value,
          hueRotate: this.refs.sidebar.refs.hueRotate.refs.range.value,
          blur: this.refs.sidebar.refs.blur.refs.range.value,
          opacity: this.refs.sidebar.refs.opacity.refs.range.value,
          blend: this.refs.sidebar.refs.blend.refs.select.value
        },
        overlayType: 'solid'
      });
    },

    updateOverlayType: function(event) {
      this.setState({
        overlayType: event.currentTarget.value
      })
    },

    render: function() {
        return (
          <section className="wrap">
            <Main filter={this.state.filter} />
            <Sidebar
              ref="sidebar"
              overlayType={this.state.overlayType}
              updateOverlayType={this.updateOverlayType}
              filter={this.state.filter}
              handeUpdate={this.handeUpdate}
            />
          </section>
        );
    }
});

module.exports = App;

var React = require('React');
var Update = require('react-addons-update');
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
        overlay: {
          type: 'solid',
          color: { a: 1, b: 62, g: 142, r: 253 }
        }
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
      var newState = Update(this.state, {
        overlay: {
          type: { $set: event.currentTarget.value }
        }
      });
      this.setState(newState);
    },

    updateOverlayColor: function(color) {
      var newState = Update(this.state, {
        overlay: {
          color: { $set: color.rgb }
        }
      });
      this.setState(newState);
    },

    render: function() {
        return (
          <section className="wrap">
            <Main
              overlay={this.state.overlay}
              filter={this.state.filter}
            />
            <Sidebar
              ref="sidebar"
              overlay={this.state.overlay}
              filter={this.state.filter}
              updateOverlayColor={this.updateOverlayColor}
              updateOverlayType={this.updateOverlayType}
              handeUpdate={this.handeUpdate}
            />
          </section>
        );
    }
});

module.exports = App;

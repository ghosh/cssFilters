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
          opacity: '50',   // <-- Move to overlay
          blend: 'overlay' // <-- Move to overlay
        },
        overlay: {
          type: 'solid',
          direction: 'to bottom',
          position: 'middle center',
          size: 'closest-corner',
          color: { a: 1, b: 62, g: 142, r: 253 },
          color1: {
            color: { a: 1, b: 62, g: 142, r: 253 },
            stop: 10
          },
          color2: {
            color: { a: 1, b: 62, g: 142, r: 253 },
            stop: 100
          }
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
        }
      });
    },

    updateGradientPositions: function(event) {
      if ( this.refs.sidebar.refs.background.refs.gradientsDirection != undefined ) {
        var newState = Update(this.state, {
          overlay: {
            direction: { $set: this.refs.sidebar.refs.background.refs.gradientsDirection.refs.direction.value }
          }
        });
      } else if ( this.refs.sidebar.refs.background.refs.gradientsPosition != undefined ) {
        var newState = Update(this.state, {
          overlay: {
            position: { $set: this.refs.sidebar.refs.background.refs.gradientsPosition.refs.position.value },
            size: { $set: this.refs.sidebar.refs.background.refs.gradientsSize.refs.size.value }
          }
        });
      }
      this.setState(newState);
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

    updateColor1: function(color) {
      var newState = Update(this.state, {
        overlay: {
          color1: {
            color: { $set: color.rgb }
          }
        }
      });
      this.setState(newState);
    },

    updateColor2: function(color) {
      var newState = Update(this.state, {
        overlay: {
          color2: {
            color: { $set: color.rgb }
          }
        }
      });
      this.setState(newState);
    },

    updateColor1Stop: function(event) {

      newNum = (typeof event == 'number') ? event : parseInt(event.target.value);

      if (newNum >= 1 || newNum <=100) {
        var num = newNum;
      } else if (newNum >= 100) {
        var num = 100;
      } else {
        var num = 1;
      }

      var newState = Update(this.state, {
        overlay: {
          color1: {
            stop: { $set: num }
          }
        }
      });
      this.setState(newState);
    },

    updateColor2Stop: function(event) {

      newNum = (typeof event == 'number') ? event : parseInt(event.target.value);

      if (newNum > 1 && newNum <100) {
        var num = newNum;
      } else if (newNum >= 100) {
        var num = 100;
      } else if (newNum < 1) {
        var num = 1;
      } else {
        num = 1;
      }

      var newState = Update(this.state, {
        overlay: {
          color2: {
            stop: { $set: num }
          }
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
              updateColor1={this.updateColor1}
              updateColor1Stop={this.updateColor1Stop}
              updateColor2={this.updateColor2}
              updateColor2Stop={this.updateColor2Stop}
              updateOverlayType={this.updateOverlayType}
              updateGradientPositions={this.updateGradientPositions}
              handeUpdate={this.handeUpdate}
            />
          </section>
        );
    }
});

module.exports = App;

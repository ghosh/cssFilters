var React = require('React');
var Update = require('react-addons-update');
var Sidebar = require('./layout/sidebar.jsx');
var Main = require('./layout/main.jsx');
var Gallery = require('./layout/gallery.jsx');
var Presets = require('../presets');

var App = React.createClass({

    getInitialState: function() {
      return {
        preset: 'custom',
        gallery: {
          visible: false
        },
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
          blend: 'normal' // <-- Move to overlay
        },
        overlay: {
          type: 'solid',
          direction: 'to bottom',
          position: 'center center',
          size: 'closest-corner',
          color: { a: 1, b: 62, g: 142, r: 253 },
          color1: {
            color: { a: 1, b: 35, g: 35, r: 35 },
            stop: 10
          },
          color2: {
            color: { a: 0.04, b: 70, g: 70, r: 70 },
            stop: 100
          }
        }
      }
    },

    _extend: function(obj1, obj2){
        var obj3 = {};
        for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
        for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
        return obj3;
    },

    _init: {},

    _cloneInitialState: (function() {
      var executed = false;
      return function () {
          if (!executed) {
              executed = true;
              this._init = this.state;
          }
      };
    }.bind(this))(),

    toggleGallery: function(event) {
      var newState = Update(this.state, {
        gallery: {
          visible: { $set: !this.state.gallery.visible }
        }
      });
      this.setState(newState);
    },

    updatePreset: function(key) {
      var Filter = this._extend(this._init.filter, Presets[key].filter);
      var Overlay = this._extend(this._init.overlay, Presets[key].overlay);

      var newState = Update(this.state, {
        preset: {$set: key},
        filter: {$set: Filter},
        overlay: {$set: Overlay}
      });
      this.setState(newState);
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
        preset: 'custom'
      });
    },

    updateGradientPositions: function(event) {
      if ( this.refs.sidebar.refs.background.refs.gradientsDirection != undefined ) {
        var newState = Update(this.state, {
          overlay: {
            direction: { $set: this.refs.sidebar.refs.background.refs.gradientsDirection.refs.direction.value }
          },
          preset: { $set: 'custom' }
        });
      } else if ( this.refs.sidebar.refs.background.refs.gradientsPosition != undefined ) {
        var newState = Update(this.state, {
          overlay: {
            position: { $set: this.refs.sidebar.refs.background.refs.gradientsPosition.refs.position.value },
            size: { $set: this.refs.sidebar.refs.background.refs.gradientsSize.refs.size.value }
          },
          preset: { $set: 'custom' }
        });
      }
      this.setState(newState);
    },

    updateOverlayType: function(event) {
      var newState = Update(this.state, {
        overlay: {
          type: { $set: event.currentTarget.value }
        },
        preset: { $set: 'custom' }
      });
      this.setState(newState);
    },

    updateOverlayColor: function(color) {
      var newState = Update(this.state, {
        overlay: {
          color: { $set: color.rgb }
        },
        preset: { $set: 'custom' }
      });
      this.setState(newState);
    },

    updateColor1: function(color) {
      var newState = Update(this.state, {
        overlay: {
          color1: {
            color: { $set: color.rgb }
          }
        },
        preset: { $set: 'custom' }
      });
      this.setState(newState);
    },

    updateColor2: function(color) {
      var newState = Update(this.state, {
        overlay: {
          color2: {
            color: { $set: color.rgb }
          }
        },
        preset: { $set: 'custom' }
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
        },
        preset: { $set: 'custom' }
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
        },
        preset: { $set: 'custom' }
      });
      this.setState(newState);
    },

    render: function() {
        this._cloneInitialState();

        return (
          <section className="wrap" key={this.state.timestamp}>
            <div className="wrap-minor">
              <Main
                overlay={this.state.overlay}
                filter={this.state.filter}
                gallery={this.state.gallery}
                toggleGallery={this.toggleGallery}
              />
              <Gallery
                preset={this.state.preset}
                gallery={this.state.gallery}
                updatePreset={this.updatePreset}
              />
            </div>
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

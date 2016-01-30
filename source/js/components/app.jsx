var React = require('react');
var Update = require('react-addons-update');
var Sidebar = require('./layout/sidebar.jsx');
var Main = require('./layout/main.jsx');
var Gallery = require('./layout/gallery.jsx');
var Presets = require('../presets');

var App = React.createClass({

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

  getInitialState: function() {
    return {
      preset: 'custom',
      image: {
        type: 'unsplash',
        unsplashID: 'W_9mOGUwR08'
      },
      gallery: {
        visible: true
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
        type: 'none',
        direction: 'to bottom',
        position: 'center center',
        size: 'closest-corner',
        color: { a: 0.5, b: 253, g: 162, r: 62 },
        color1: {
          color: { a: 0.5, b: 253, g: 162, r: 62 },
          stop: 10
        },
        color2: {
          color: { a: 0.04, b: 70, g: 70, r: 70 },
          stop: 100
        }
      }
    }
  },

  resetState: function() {
    var newState = Update(this.state, {
      filter: { $set : this._init.filter},
      overlay: { $set : this._init.overlay},
      preset: { $set : 'custom'}
    })
    this.setState(newState);
  },

  updateMainImage: function(type, val) {
    switch (type) {
      case 'unsplash':
          var newState = Update(this.state, {
            image: {
              type: { $set: 'unsplash' },
              unsplashID: { $set: val }
            }
          });
          this.setState(newState);
        break;
      case 'upload':
      var newState = Update(this.state, {
        image: {
          type: { $set: 'upload' },
          source: { $set: val }
        }
      });

      default:
        this.setState(newState);
        break;
    }
  },

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
    var newState = Update(this.state, {
      filter: {
        contrast: { $set : this.refs.sidebar.refs.contrast.refs.range.value },
        saturate: { $set : this.refs.sidebar.refs.saturate.refs.range.value },
        brightness: { $set : this.refs.sidebar.refs.brightness.refs.range.value },
        sepia: { $set : this.refs.sidebar.refs.sepia.refs.range.value },
        grayscale: { $set : this.refs.sidebar.refs.grayscale.refs.range.value },
        invert: { $set : this.refs.sidebar.refs.invert.refs.range.value },
        hueRotate: { $set : this.refs.sidebar.refs.hueRotate.refs.range.value },
        blur: { $set : this.refs.sidebar.refs.blur.refs.range.value }
      }
    })
    this.setState(newState);
  },
  
  updateOverlay: function(event) {
    var newState = Update(this.state, {
      filter: {
        opacity: { $set : this.refs.sidebar.refs.background.refs.opacity.refs.range.value },
        blend: { $set : this.refs.sidebar.refs.background.refs.blend.refs.select.value }
      }
    })
    this.setState(newState);
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
      <Gallery
      image={this.state.image}
      preset={this.state.preset}
      gallery={this.state.gallery}
      updatePreset={this.updatePreset}
      />
      <Main
      image={this.state.image}
      overlay={this.state.overlay}
      filter={this.state.filter}
      gallery={this.state.gallery}
      toggleGallery={this.toggleGallery}
      updateMainImage={this.updateMainImage}
      />
      </div>
      <Sidebar
      ref="sidebar"
      overlay={this.state.overlay}
      filter={this.state.filter}
      resetState={this.resetState}
      updateOverlay={this.updateOverlay}
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

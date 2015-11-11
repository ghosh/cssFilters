var React = require('React');
var ColorPicker = require('react-color');

var Color = React.createClass({
    getInitialState: function() {
      return {
        displayColorPicker: false,
        color: { a: 1, b: 62, g: 142, r: 253 }
      }
    },

    toggleColorPicker: function() {
      this.setState({
        displayColorPicker: !this.state.displayColorPicker
      });
    },

    handleChange: function(color) {
        this.setState({
          color: color.rgb
        });
    },

    handleClose: function() {
      this.setState({ displayColorPicker: false });
    },

    render: function() {

      var swatchColor = {
        backgroundColor: 'rgba('+this.state.color.r+', '+this.state.color.g+', '+this.state.color.b+', '+this.state.color.a+')'
      }

      var popupPosition = {
        left: 'initial',
        top: 'initial',
        marginLeft: '0',
        zIndex: '999',
        bottom: '100%',
        marginBottom: '20px',
        position: 'absolute'
      }

      return (
        <div className="color-swatch">
          <div className="swatch" onClick={ this.toggleColorPicker }>
            <div className="color" style={swatchColor}></div>
          </div>
          <ColorPicker
            className="color-picker"
            color={ this.state.color }
            positionCSS={ popupPosition }
            onChange={ this.handleChange }
            onClose={ this.handleClose }
            display={ this.state.displayColorPicker }
            type="chrome"
          />
        </div>

      );

    }
});

module.exports = Color;

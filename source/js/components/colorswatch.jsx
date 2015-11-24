var React = require('react');
var ColorPicker = require('react-color');

var ColorSwatch = React.createClass({

  getInitialState: function() {
    return {
      displayColorPicker: false
    }
  },

  toggleColorPicker: function() {
    this.setState({
      displayColorPicker: !this.state.displayColorPicker
    });
  },

  handleClose: function() {
    this.setState({ displayColorPicker: false });
  },

  render: function() {

    var swatchColor = {
      backgroundColor: 'rgba('+this.props.overlayColor.r+', '+this.props.overlayColor.g+', '+this.props.overlayColor.b+', '+this.props.overlayColor.a+')'
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
      <div className="color__box">
        <div className="color__swatch" onClick={ this.toggleColorPicker }>
          <div className="color__preview" style={swatchColor}></div>
        </div>
        <p className="color__text">{this.props.label}</p>
        <ColorPicker
          className="color-picker"
          color={ this.props.overlayColor }
          positionCSS={ popupPosition }
          onChange={ this.props.updateColor }
          onClose={ this.handleClose }
          display={ this.state.displayColorPicker }
          type="chrome"
        />
      </div>
    );
  }
});

module.exports = ColorSwatch;

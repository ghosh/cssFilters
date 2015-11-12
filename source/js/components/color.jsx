var React = require('React');
var ColorPicker = require('react-color');

var Color = React.createClass({
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
        <div className="color">
          <div className="color__box">
            <div className="color__swatch" onClick={ this.toggleColorPicker }>
              <div className="color__preview" style={swatchColor}></div>
            </div>
            <p className="color__text">{this.props.label}</p>
            <ColorPicker
              className="color-picker"
              color={ this.props.overlayColor }
              positionCSS={ popupPosition }
              onChange={ this.props.updateOverlayColor }
              onClose={ this.handleClose }
              display={ this.state.displayColorPicker }
              type="chrome"
            />
          </div>
          <div className="color__stop">
            <div className="color__stop-number number">
              <input className="number__input" id="number" min="1" max="100" />
              <div className="number__up">+</div>
              <div className="number__down">-</div>
            </div>
            <p className="color__stop-label">Stop</p>
          </div>
        </div>
      );

    }
});

module.exports = Color;

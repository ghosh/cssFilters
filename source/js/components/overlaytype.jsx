var React = require('react');

var OverlayType = React.createClass({
    render: function() {
      return (
        <fieldset className="radio-group">
          <input id="r4" type="radio" name="background" value="none" className="radio" checked={this.props.overlayType === 'none'} onChange={this.props.updateOverlayType} />
          <label className="radio-label" htmlFor="r4"><i></i>None</label>
          <input id="r1" type="radio" name="background" value="solid" className="radio" checked={this.props.overlayType === 'solid'} onChange={this.props.updateOverlayType} />
          <label className="radio-label" htmlFor="r1"><i></i>Solid Background</label>
          <input id="r2" type="radio" name="background" value="linear" className="radio" checked={this.props.overlayType === 'linear'} onChange={this.props.updateOverlayType} />
          <label className="radio-label" htmlFor="r2"><i></i>Linear Gradient</label>
          <input id="r3" type="radio" name="background" value="radial" className="radio" checked={this.props.overlayType === 'radial'} onChange={this.props.updateOverlayType} />
          <label className="radio-label" htmlFor="r3"><i></i>Radial Gradient</label>
        </fieldset>    
      );
    }
});

module.exports = OverlayType;

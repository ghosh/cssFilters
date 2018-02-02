var React = require('react');

var Toggle = React.createClass({
    render: function() {
      return (
      <fieldset className="toggle-group">
        <input type="checkbox" name="toggle" id="t1" className="tgl" checked={this.props.toggle} onChange={this.props.updateToggle}/>
        <label className="tgl-btn" htmlFor="t1"><i></i></label>
        <label className="toggle-label" htmlFor="t1"><i></i>{this.props.toggle ? 'On' : 'Off'}</label>
      </fieldset>
      );
    }
});

module.exports = Toggle;

var React = require('react');

var Enabled = React.createClass({
    render: function() {
      return (
      <fieldset className="checkbox-group">
        <input type="checkbox" name="enabled" id="c1" className="checkbox" checked={this.props.enabled} onChange={this.props.updateEnabled}/>
        <label className="checkbox-label" htmlFor="c1"><i></i><span>{this.props.enabled ? 'Disable' : 'Enable'} effect</span></label>
      </fieldset>
      );
    }
});

module.exports = Enabled;

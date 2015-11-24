var React = require('react');

var BlendMode = React.createClass({
    render: function() {

      var modes = [ 'overlay', 'normal', 'multiply', 'screen', 'darken', 'lighten', 'color-dodge',  'color-burn', 'hard-light', 'soft-light', 'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity', 'initial', 'inherit', 'unset' ];

      var blendModes = modes.map(function(mode, index){
        return (
          <option value={mode} key={index}>
            {mode.replace(/^./, mode[0].toUpperCase())}
          </option>
        );
      });

      return (
        <div className="opts">
          <label>Mix Blend Mode</label>
          <div className="dropdown">
              <select ref="select" name="blend-mode" className="dropdown-select" onChange={this.props.handeUpdate} value={this.props.blend}>
                {blendModes}
              </select>
          </div>
        </div>
      );
    }
});

module.exports = BlendMode;

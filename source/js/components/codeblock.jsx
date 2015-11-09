var React = require('React');

var CodeBlock = React.createClass({

  render: function() {

    var filters = [];

    (this.props.filter.contrast != 100) ? filters.push('contrast('+this.props.filter.contrast+')') : '';
    (this.props.filter.brightness != 100) ? filters.push('brightness('+this.props.filter.brightness+')') : '';
    (this.props.filter.saturate != 100) ? filters.push('saturate('+this.props.filter.saturate+')') : '';

    var filters = filters.join(' ');

    return (
      <pre className="code__panel"><code>
        .filter &#40; <br />
        &nbsp;&nbsp;position: relative, <br />
        &nbsp;&nbsp;-webkit-filter: {filters}, <br />
        &nbsp;&nbsp;filter: {filters}, <br />
        &#41;<br />
        .filter::before &#40; <br />
        &nbsp;&nbsp;content &#58; '', <br />
        &nbsp;&nbsp;display &#58; block, <br />
        &nbsp;&nbsp;height &#58; 100%, <br />
        &nbsp;&nbsp;width &#58; 100%, <br />
        &nbsp;&nbsp;top &#58; 0, <br />
        &nbsp;&nbsp;left &#58; 0, <br />
        &nbsp;&nbsp;position &#58; absolute, <br />
        &nbsp;&nbsp;pointer-events &#58; none, <br />
        &#41;<br />
      </code></pre>
    );
  }
});

module.exports = CodeBlock;

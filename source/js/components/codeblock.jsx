var React = require('React');

var CodeBlock = React.createClass({

  render: function() {

    var filters = [];

    (this.props.filter.contrast != 100) ? filters.push('contrast('+this.props.filter.contrast+'%)') : '';
    (this.props.filter.brightness != 100) ? filters.push('brightness('+this.props.filter.brightness+'%)') : '';
    (this.props.filter.saturate != 100) ? filters.push('saturate('+this.props.filter.saturate+'%)') : '';
    (this.props.filter.sepia != 0) ? filters.push('sepia('+this.props.filter.sepia+'%)') : '';
    (this.props.filter.grayscale != 0) ? filters.push('grayscale('+this.props.filter.grayscale+'%)') : '';
    (this.props.filter.invert != 0) ? filters.push('invert('+this.props.filter.invert+'%)') : '';
    (this.props.filter.hueRotate != 0) ? filters.push('hue-rotate('+this.props.filter.hueRotate+'deg)') : '';
    (this.props.filter.blur != 0) ? filters.push('blur('+this.props.filter.blur+'px)') : '';

    var filters = filters.join(' ');

    return (
      <pre className="code__panel"><code>
        .filter &#123;<br />
        &nbsp;&nbsp;position: relative;<br />
        &nbsp;&nbsp;-webkit-filter: {filters};<br />
        &nbsp;&nbsp;filter: {filters};<br />
        &#125;<br />
        .filter::before &#123;<br />
        &nbsp;&nbsp;content: '';<br />
        &nbsp;&nbsp;display: block;<br />
        &nbsp;&nbsp;height: 100%;<br />
        &nbsp;&nbsp;width: 100%;<br />
        &nbsp;&nbsp;top: 0;<br />
        &nbsp;&nbsp;left: 0;<br />
        &nbsp;&nbsp;position: absolute;<br />
        &nbsp;&nbsp;pointer-events: none;<br />
        &#125;<br />
      </code></pre>
    );
  }
});

module.exports = CodeBlock;

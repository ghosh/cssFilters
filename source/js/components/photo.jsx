var React = require('React');

var Photo = React.createClass({
    render: function() {

      var filters = 'sepia(' + this.props.filter.sepia + '%) ';
          filters += 'brightness(' + this.props.filter.brightness + '%) ';
          filters += 'contrast(' + this.props.filter.contrast + '%) ';
          filters += 'saturate(' + this.props.filter.saturate + '%) ';
          filters += 'grayscale(' + this.props.filter.grayscale + '%) ';
          filters += 'invert(' + this.props.filter.invert + '%) ';
          filters += 'hue-rotate(' + this.props.filter.hueRotate + 'deg) ';
          filters += 'blur(' + this.props.filter.blur + 'px) ';

      var filterStyles = {
        position: 'relative',
        WebkitFilter: filters,
        filter: filters
      }

      var pseudoStyles = {
        content: ' ',
        display: 'block',
        height: '100%',
        width: '100%',
        top: '0',
        left: '0',
        pointerEvents: 'none',
        position: 'absolute',

        background: '#efcdad',
        mixBlendMode: this.props.filter.blend,
        opacity: (this.props.filter.opacity/100)
      }

      return (
        <div className="photo">
          <figure style={filterStyles}>
            <div style={pseudoStyles} />
            <img src="https://source.unsplash.com/W_9mOGUwR08/800x600" alt="" className="photo__img" />
          </figure>
        </div>
      );
    }
});

module.exports = Photo;

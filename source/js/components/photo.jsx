var React = require('React');

var Photo = React.createClass({
    render: function() {

      var direction  = this.props.overlay.direction;
      var size       = this.props.overlay.size;
      var position       = this.props.overlay.position;
      var color      = 'rgba('+this.props.overlay.color.r+', '+this.props.overlay.color.g+', '+this.props.overlay.color.b+', '+this.props.overlay.color.a+')';
      var color1     = 'rgba('+this.props.overlay.color1.color.r+', '+this.props.overlay.color1.color.g+', '+this.props.overlay.color1.color.b+', '+this.props.overlay.color1.color.a+')';
      var color2     = 'rgba('+this.props.overlay.color2.color.r+', '+this.props.overlay.color2.color.g+', '+this.props.overlay.color2.color.b+', '+this.props.overlay.color2.color.a+')';
      var color1Stop = this.props.overlay.color1.stop;
      var color2Stop = this.props.overlay.color2.stop;

      switch (this.props.overlay.type) {
        case 'solid':
          var background = color;
          break;
        case 'linear':
          var background = 'linear-gradient( '+direction+', '+color1+' '+color1Stop+'%, '+color2+' '+color2Stop+'% )';
          break;
        case 'radial':
          var background = '-webkit-radial-gradient('+position+', ellipse '+size+', '+color1+' '+color1Stop+'%, '+color2+' '+color2Stop+'% )';
          break;
        default:
      }

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

        mixBlendMode: this.props.filter.blend,
        opacity: (this.props.filter.opacity/100),

        background: background
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

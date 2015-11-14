function Factory(filter, overlay) {

  if (!(this instanceof Factory)) {
    return new Factory(filter, overlay);
  }

  this.filter = filter;
  this.overlay = overlay;

};

Factory.prototype.getOverlayStyles = function getOverlayStyles() {

  var blend = this.filter.blend;
  var opacity = this.filter.opacity;
  var direction  = this.overlay.direction;
  var size       = this.overlay.size;
  var position       = this.overlay.position;
  var color      = 'rgba('+this.overlay.color.r+', '+this.overlay.color.g+', '+this.overlay.color.b+', '+this.overlay.color.a+')';
  var color1     = 'rgba('+this.overlay.color1.color.r+', '+this.overlay.color1.color.g+', '+this.overlay.color1.color.b+', '+this.overlay.color1.color.a+')';
  var color2     = 'rgba('+this.overlay.color2.color.r+', '+this.overlay.color2.color.g+', '+this.overlay.color2.color.b+', '+this.overlay.color2.color.a+')';
  var color1Stop = this.overlay.color1.stop;
  var color2Stop = this.overlay.color2.stop;

  switch (this.overlay.type) {
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

  var styles = {
    content: ' ',
    display: 'block',
    height: '100%',
    width: '100%',
    top: '0',
    left: '0',
    pointerEvents: 'none',
    position: 'absolute',

    mixBlendMode: blend,
    opacity: (opacity/100),

    background: background
  }

  return styles;
};

Factory.prototype.getFilterStyles = function getFilterStyles() {
  var filters = 'sepia(' + this.filter.sepia + '%) ';
      filters += 'brightness(' + this.filter.brightness + '%) ';
      filters += 'contrast(' + this.filter.contrast + '%) ';
      filters += 'saturate(' + this.filter.saturate + '%) ';
      filters += 'grayscale(' + this.filter.grayscale + '%) ';
      filters += 'invert(' + this.filter.invert + '%) ';
      filters += 'hue-rotate(' + this.filter.hueRotate + 'deg) ';
      filters += 'blur(' + this.filter.blur + 'px) ';

  var styles = {
    position: 'relative',
    WebkitFilter: filters,
    filter: filters
  }

  return styles;
};

module.exports = Factory;

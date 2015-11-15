function Factory(filter, overlay) {

  if (!(this instanceof Factory)) {
    return new Factory(filter, overlay);
  }

  this.filter = filter;
  this.overlay = overlay;

};

Factory.prototype.getOverlayStyles = function getOverlayStyles() {

  if (this.filter.blend) {
    var blend = this.filter.blend;
  }

  if (this.filter.opacity) {
    var opacity = this.filter.opacity;
  } else {
    var opacity = 100;
  }

  if (this.overlay.direction) {
    var direction = this.overlay.direction;
  }

  if (this.overlay.size) {
    var size = this.overlay.size;
  }

  if (this.overlay.position) {
    var position = this.overlay.position;
  }

  if (this.overlay.color) {
    var color = 'rgba('+this.overlay.color.r+', '+this.overlay.color.g+', '+this.overlay.color.b+', '+this.overlay.color.a+')';
  }

  if (this.overlay.color1) {
    var color1 = 'rgba('+this.overlay.color1.color.r+', '+this.overlay.color1.color.g+', '+this.overlay.color1.color.b+', '+this.overlay.color1.color.a+')';
    var color1Stop = this.overlay.color1.stop;
  }

  if (this.overlay.color2) {
    var color2 = 'rgba('+this.overlay.color2.color.r+', '+this.overlay.color2.color.g+', '+this.overlay.color2.color.b+', '+this.overlay.color2.color.a+')'
    var color2Stop = this.overlay.color2.stop;
  }


  switch (this.overlay.type) {
    case 'solid':
      var background = color;
      break;
    case 'linear':
      var background = 'linear-gradient( '+direction+', '+color1+' '+color1Stop+'%, '+color2+' '+color2Stop+'% )';
      break;
    case 'radial':
      var background = '-webkit-radial-gradient('+position+', circle '+size+', '+color1+' '+color1Stop+'%, '+color2+' '+color2Stop+'% )';
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
  var filters = '';
      filters += (this.filter.sepia) ? 'sepia(' + this.filter.sepia + '%) ' : '';
      filters += (this.filter.brightness) ? 'brightness(' + this.filter.brightness + '%) ': '';
      filters += (this.filter.contrast) ? 'contrast(' + this.filter.contrast + '%) ': '';
      filters += (this.filter.saturate) ? 'saturate(' + this.filter.saturate + '%) ': '';
      filters += (this.filter.grayscale) ? 'grayscale(' + this.filter.grayscale + '%) ': '';
      filters += (this.filter.invert) ? 'invert(' + this.filter.invert + '%) ': '';
      filters += (this.filter.hueRotate) ? 'hue-rotate(' + this.filter.hueRotate + 'deg) ': '';
      filters += (this.filter.blur) ? 'blur(' + this.filter.blur + 'px) ': '';

  var styles = {
    position: 'relative',
    WebkitFilter: filters,
    filter: filters
  }

  return styles;
};

module.exports = Factory;

// greetings.js
var filters = {
  '1977': {
    filter: {
      contrast: '110',
      brightness: '110',
      saturate: '130',
      opacity: '100',
      blend: 'screen'
    },
    overlay: {
      type: 'solid',
      color: { a: 0.3, b: 188, g: 106, r: 243 }
    }
  },
  'aden': {
    filter: {
      hueRotate: '20',
      contrast: '90',
      saturate: '85',
      brightness: '120',
      blend: 'darken'
    },
    overlay: {
      type: 'linear',
      direction: 'to right',
      color1: {
        color: { a: 0.2, b: 14, g: 10, r: 66 },
        stop: 1
      },
      color2: {
        color: { a: 0, b: 14, g: 10, r: 66 },
        stop: 100
      },
    }
  }
};

module.exports = filters;

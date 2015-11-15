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
      opacity: '100',
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
      }
    }
  },
  'brooklyn': {
    filter: {
      contrast: '90',
      brightness: '110',
      opacity: '100',
      blend: 'overlay'
    },
    overlay: {
      type: 'radial',
      position: 'center center',
      size: 'closest-corner',
      color1: {
        color: { a: 0.4, b: 193, g: 223, r: 168 },
        stop: 1
      },
      color2: {
        color: { a: 0.2, b: 200, g: 196, r: 183 },
        stop: 100
      }
    }
  },
  'earlybird': {
    filter: {
      contrast: '90',
      sepia: '20',
      blend: 'overlay',
      opacity: '100'
    },
    overlay: {
      type: 'radial',
      color1: {
        color: { a: 1, b: 142, g: 186, r: 208 },
        stop: 20
      },
      color2: {
        color: { a: 0.2, b: 16, g: 2, r: 29 },
        stop: 100
      }
    }
  },
  'gingham': {
    filter: {
      brightness: '105',
      hueRotate: '350',
      blend: 'darken',
      opacity: '100'
    },
    overlay: {
      type: 'linear',
      direction: 'to right',
      color1: {
        color: { a: 0.2, b: 14, g: 10, r: 66 },
        stop: 1
      },
      color2: {
        color: { a: 0, b: 0, g: 0, r: 0 },
        stop: 100
      }
    }
  },
  'earlybird': {
    filter: {
      contrast: '90',
      sepia: '20',
      blend: 'overlay',
      opacity: '100'
    },
    overlay: {
      type: 'radial',
      color1: {
        color: { a: 1, b: 142, g: 186, r: 208 },
        stop: 20
      },
      color2: {
        color: { a: 0.2, b: 16, g: 2, r: 29 },
        stop: 100
      }
    }
  },
  'hudson': {
    filter: {
      brightness: '120',
      contrast: '90',
      saturate: '110',
      blend: 'multiply',
      opacity: '50'
    },
    overlay: {
      type: 'radial',
      color1: {
        color: { a: 1, b: 166, g: 177, r: 255 },
        stop: 50
      },
      color2: {
        color: { a: 1, b: 52, g: 33, r: 52 },
        stop: 100
      }
    }
  },
  'inkwell': {
    filter: {
      sepia: '30',
      contrast: '110',
      brightness: '110',
      grayscale: '100',
      opacity: '100'
    },
    overlay: {
      type: 'solid',
      color: { a: 0, b: 0, g: 0, r: 0 }
    }
  },
  'lofi': {
    filter: {
      saturate: '110',
      contrast: '150',
      opacity: '100',
      blend: 'multiply'
    },
    overlay: {
      type: 'radial',
      color1: {
        color: { a: 0, b: 0, g: 0, r: 0 },
        stop: 70
      },
      color2: {
        color: { a: 1, b: 34, g: 34, r: 34 },
        stop: 100
      }
    }
  },
  'perpetua': {
    filter: {
      opacity: '50',
      blend: 'soft-light'
    },
    overlay: {
      type: 'linear',
      direction: 'to bottom',
      color1: {
        color: { a: 1, b: 154, g: 91, r: 0 },
        stop: 1
      },
      color2: {
        color: { a: 0, b: 230, g: 193, r: 61 },
        stop: 100
      }
    }
  },
  'reyes': {
    filter: {
      sepia: '22',
      contrast: '85',
      brightness: '110',
      saturate: '75',
      opacity: '50',
      blend: 'soft-light'
    },
    overlay: {
      type: 'solid',
      color: { a: 1, b: 239, g: 205, r: 173 }
    }
  },
  'toaster': {
    filter: {
      contrast: '150',
      brightness: '90',
      opacity: '50',
      blend: 'screen'
    },
    overlay: {
      type: 'radial',
      color1: {
        color: { a: 1, b: 128, g: 78, r: 15 },
        stop: 1
      },
      color2: {
        color: { a: 1, b: 59, g: 0, r: 59 },
        stop: 100
      }
    }
  },
  'walden': {
    filter: {
      brightness: '110',
      hueRotate: '350',
      sepia: '30',
      saturate: '160',
      opacity: '30',
      blend: 'screen'
    },
    overlay: {
      type: 'solid',
      color: { a: 1, b: 0, g: 68, r: 204 }
    }
  },
  'xpro2': {
    filter: {
      sepia: '30',
      opacity: '100',
      blend: 'color-burn'
    },
    overlay: {
      type: 'radial',
      color1: {
        color: { a: 1, b: 230, g: 231, r: 224 },
        stop: 40
      },
      color2: {
        color: { a: 0.6, b: 161, g: 42, r: 43 },
        stop: 100
      }
    }
  }
};

module.exports = filters;

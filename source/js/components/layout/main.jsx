var React = require('React');

var Main = React.createClass({
    render: function() {

      var filters = 'sepia(' + this.props.filter.sepia + '%) ';
      filters += 'brightness(' + this.props.filter.brightness + '%) ';
      filters += 'contrast(' + this.props.filter.contrast + '%) ';
      filters += 'saturate(' + this.props.filter.saturate + '%) ';

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
        mixBlendMode: 'soft-light',
        opacity: '0.5'
      }

      return (
        <main className="main">
          <div className="photo">
            <figure style={filterStyles}>
              <div style={pseudoStyles} />
              <img src="https://source.unsplash.com/mtNweauBsMQ/800x600" alt="" className="photo__img" />
            </figure>
          </div>
        </main>
      )
    }
});

module.exports = Main;

var React = require('React');

var Main = React.createClass({
    render: function() {
      var style = {
        WebkitFilter: 'sepia(.3) contrast(1.1) brightness(1.1) grayscale(1)',
        filter: 'sepia(.3) contrast(1.1) brightness(1.1) grayscale(1)'
      }

      return (
        <main className="main">
          <div className="photo">
            <figure style={style}>
              <img src="https://source.unsplash.com/mtNweauBsMQ/800x600" alt="" className="photo__img" />
            </figure>
          </div>
        </main>
      )
    }
});

module.exports = Main;

var React = require('React');

var Main = React.createClass({
    render: function() {
      return (
        <main className="main">
          <div className="photo">
            <figure className="aden">
              <img src="https://source.unsplash.com/mtNweauBsMQ/800x600" alt="" className="photo__img" />
            </figure>
          </div>
        </main>
      )
    }
});

module.exports = Main;

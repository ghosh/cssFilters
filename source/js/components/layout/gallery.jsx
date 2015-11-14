var React = require('React');
var classNames = require('classnames');

var Gallery = React.createClass({
    render: function() {

      var galleryClass = classNames({
        'gallery': true,
        'is-active': this.props.gallery.visible
      });

      return (
        <div className={galleryClass}>
          <ul className="gallery__items">
            <li className="gallery__item">
              <div className="thumb">
                <figure className="thumb__figure">
                  <img src="https://source.unsplash.com/W_9mOGUwR08/100x75" alt="" className="thumb__img" />
                </figure>
                <p className="thumb__label">Aden</p>
              </div>
            </li>
            <li className="gallery__item">
              <div className="thumb">
                <figure className="thumb__figure">
                  <img src="https://source.unsplash.com/W_9mOGUwR08/100x75" alt="" className="thumb__img" />
                </figure>
                <p className="thumb__label">Aden</p>
              </div>
            </li>
            <li className="gallery__item">
              <div className="thumb">
                <figure className="thumb__figure">
                  <img src="https://source.unsplash.com/W_9mOGUwR08/100x75" alt="" className="thumb__img" />
                </figure>
                <p className="thumb__label">Aden</p>
              </div>
            </li>
            <li className="gallery__item">
              <div className="thumb">
                <figure className="thumb__figure">
                  <img src="https://source.unsplash.com/W_9mOGUwR08/100x75" alt="" className="thumb__img" />
                </figure>
                <p className="thumb__label">Aden</p>
              </div>
            </li>
            <li className="gallery__item">
              <div className="thumb">
                <figure className="thumb__figure">
                  <img src="https://source.unsplash.com/W_9mOGUwR08/100x75" alt="" className="thumb__img" />
                </figure>
                <p className="thumb__label">Aden</p>
              </div>
            </li>
            <li className="gallery__item">
              <div className="thumb">
                <figure className="thumb__figure">
                  <img src="https://source.unsplash.com/W_9mOGUwR08/100x75" alt="" className="thumb__img" />
                </figure>
                <p className="thumb__label">Aden</p>
              </div>
            </li>
            <li className="gallery__item">
              <div className="thumb">
                <figure className="thumb__figure">
                  <img src="https://source.unsplash.com/W_9mOGUwR08/100x75" alt="" className="thumb__img" />
                </figure>
                <p className="thumb__label">Aden</p>
              </div>
            </li>
            <li className="gallery__item">
              <div className="thumb">
                <figure className="thumb__figure">
                  <img src="https://source.unsplash.com/W_9mOGUwR08/100x75" alt="" className="thumb__img" />
                </figure>
                <p className="thumb__label">Aden</p>
              </div>
            </li>
            <li className="gallery__item">
              <div className="thumb">
                <figure className="thumb__figure">
                  <img src="https://source.unsplash.com/W_9mOGUwR08/100x75" alt="" className="thumb__img" />
                </figure>
                <p className="thumb__label">Aden</p>
              </div>
            </li>
            <li className="gallery__item">
              <div className="thumb">
                <figure className="thumb__figure">
                  <img src="https://source.unsplash.com/W_9mOGUwR08/100x75" alt="" className="thumb__img" />
                </figure>
                <p className="thumb__label">Aden</p>
              </div>
            </li>
            <li className="gallery__item">
              <div className="thumb">
                <figure className="thumb__figure">
                  <img src="https://source.unsplash.com/W_9mOGUwR08/100x75" alt="" className="thumb__img" />
                </figure>
                <p className="thumb__label">Aden</p>
              </div>
            </li>
            <li className="gallery__item">
              <div className="thumb">
                <figure className="thumb__figure">
                  <img src="https://source.unsplash.com/W_9mOGUwR08/100x75" alt="" className="thumb__img" />
                </figure>
                <p className="thumb__label">Aden</p>
              </div>
            </li>
            <li className="gallery__item">
              <div className="thumb">
                <figure className="thumb__figure">
                  <img src="https://source.unsplash.com/W_9mOGUwR08/100x75" alt="" className="thumb__img" />
                </figure>
                <p className="thumb__label">Aden</p>
              </div>
            </li>
            <li className="gallery__item">
              <div className="thumb">
                <figure className="thumb__figure">
                  <img src="https://source.unsplash.com/W_9mOGUwR08/100x75" alt="" className="thumb__img" />
                </figure>
                <p className="thumb__label">Aden</p>
              </div>
            </li>
            <li className="gallery__item">
              <div className="thumb">
                <figure className="thumb__figure">
                  <img src="https://source.unsplash.com/W_9mOGUwR08/100x75" alt="" className="thumb__img" />
                </figure>
                <p className="thumb__label">Aden</p>
              </div>
            </li>
            <li className="gallery__item">
              <div className="thumb">
                <figure className="thumb__figure">
                  <img src="https://source.unsplash.com/W_9mOGUwR08/100x75" alt="" className="thumb__img" />
                </figure>
                <p className="thumb__label">Aden</p>
              </div>
            </li>
            <li className="gallery__item">
              <div className="thumb">
                <figure className="thumb__figure">
                  <img src="https://source.unsplash.com/W_9mOGUwR08/100x75" alt="" className="thumb__img" />
                </figure>
                <p className="thumb__label">Aden</p>
              </div>
            </li>
            <li className="gallery__item">
              <div className="thumb">
                <figure className="thumb__figure">
                  <img src="https://source.unsplash.com/W_9mOGUwR08/100x75" alt="" className="thumb__img" />
                </figure>
                <p className="thumb__label">Aden</p>
              </div>
            </li>
            <li className="gallery__item">
              <div className="thumb">
                <figure className="thumb__figure">
                  <img src="https://source.unsplash.com/W_9mOGUwR08/100x75" alt="" className="thumb__img" />
                </figure>
                <p className="thumb__label">Aden</p>
              </div>
            </li>
            <li className="gallery__item">
              <div className="thumb">
                <figure className="thumb__figure">
                  <img src="https://source.unsplash.com/W_9mOGUwR08/100x75" alt="" className="thumb__img" />
                </figure>
                <p className="thumb__label">Aden</p>
              </div>
            </li>
            <li className="gallery__item">
              <div className="thumb">
                <figure className="thumb__figure">
                  <img src="https://source.unsplash.com/W_9mOGUwR08/100x75" alt="" className="thumb__img" />
                </figure>
                <p className="thumb__label">Aden</p>
              </div>
            </li>
            <li className="gallery__item">
              <div className="thumb">
                <figure className="thumb__figure">
                  <img src="https://source.unsplash.com/W_9mOGUwR08/100x75" alt="" className="thumb__img" />
                </figure>
                <p className="thumb__label">Aden</p>
              </div>
            </li>
          </ul>
        </div>
      );
    }
});

module.exports = Gallery;

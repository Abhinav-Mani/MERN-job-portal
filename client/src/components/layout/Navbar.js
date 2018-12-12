import React, { Component } from 'react';

class Navbar extends Component {
  render() {
    return (
      <header>
        <div className="bg-dark collapse" id="navbarHeader">
          <div className="container">
            <div className="row">
              <div className="col-sm-8 col-md-7 py-4">
                <h4 className="text-white">ENMONposlovi!</h4>
                <p className="text-muted" />
              </div>
              <div className="col-sm-4 offset-md-1 py-4">
                <h4 className="text-white">Contact</h4>
                <ul className="list-unstyled">
                  <li>
                    <a
                      href="http://www.facebook.com/enmongroup"
                      className="text-white"
                    >
                      Like on Facebook
                    </a>
                  </li>
                  <li>
                    <a
                      href="mailto:poslovi@enmongroup.com"
                      className="text-white"
                    >
                      Email me
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="navbar navbar-dark bg-primary shadow-sm">
          <div className="container d-flex justify-content-between">
            <a href="/" className="navbar-brand d-flex align-items-center">
              <img
                src="assets/briefcase.png"
                height="30"
                className="pr-2"
                alt="Briefcase"
              />
              <strong>ENMON </strong>
              poslovi
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarHeader"
              aria-controls="navbarHeader"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
          </div>
        </div>
      </header>
    );
  }
}

export default Navbar;

import React, { Component, Fragment } from 'react';
import Jumbo from '../layout/Jumbo';
import axios from 'axios';

export default class Apply extends Component {
  state = {
    job: '',
    name: '',
    email: '',
    location: '',
    phone: '',
    selectedCV: null,
    loadedCV: 0,
    selectedCL: ''
  };
  componentWillMount = () => {
    // const id = Number(this.props.match.params.id);
    // const url = `http://localhost:5000/jobs/${id}`;
    // console.log(url);
    // fetch(`http://localhost:5000/jobs/:1`)
    //   .then(data => data.json())
    //   .then(res => console.log(res));
    axios
      .get('http://localhost:5000/jobs/' + this.props.match.params.id)
      .then(res => this.setState({ job: res.data[0] }));
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  sendCv = event => {
    this.setState({
      selectedCV: event.target.files[0],
      loaded: 0
    });
    const data = new FormData();
    data.append('cv', this.state.selectedCV, this.state.selectedCV.name);
    axios
      .post('http://localhost:5000/upload', data, {
        onUploadProgress: ProgressEvent => {
          this.setState({
            loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100
          });
        }
      })
      .then(res => {
        console.log(res.statusText);
      });
  };
  render() {
    return (
      <Fragment>
        <Jumbo heading={this.state.job.title} lead="PRIJAVA" />
        <div className="album py-5 bg-light">
          <div className="container">
            <div className="row">
              <div className="col-sm-12 text-center pb-5">Vaši podatci:</div>
              <div className="col-sm-12 col-md-6 pb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ime"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                />
              </div>
              <div className="col-sm-12 col-md-6 pb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Lokacija"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                />
              </div>
              <div className="col-sm-12 col-md-6 pb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="E-mail"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
              </div>
              <div className="col-sm-12 col-md-6 pb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Telefon"
                  name="phone"
                  value={this.state.phone}
                  onChange={this.onChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 col-md-6">
                <hr />
                <h5>Vaš CV</h5>
                <small className="text-muted">
                  (moguće je uploadovati isključivo .pdf fajlove do 5MB)
                </small>
                <input type="file" name="selectedCV" onChange={this.sendCV} />
                <p>{Math.round(this.state.loaded, 2)} %</p>
                <hr />

                <h5>Vaše motivaciono pismo</h5>
                <small className="text-muted">
                  (moguće je uploadovati isključivo .pdf fajlove do 5MB)
                </small>
                <input type="file" />
              </div>
              <div className="col-sm-12 col-md-6">
                <hr />
                <h5>Prijava</h5>
                <p>
                  Enmon d.o.o. se obavezuje da neće deliti vaše lične podatke,
                  već će vaši podatci biti korišćeni isključivo u svrhu prijave
                  za poziciju u Enmon d.o.o kompaniji.
                </p>
                <br />
                <br />
                <br />
                <button className="btn btn-primary btn-lg float-right">
                  Pošalji prijavu
                </button>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

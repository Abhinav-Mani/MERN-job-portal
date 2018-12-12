import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Jumbo from '../layout/Jumbo';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import { getSingleJob } from '../../actions/jobActions';

class SingleJob extends Component {
  state = {
    job: ''
  };
  componentDidMount = () => {
    const jobId = this.props.match.params.id;
    this.props.getSingleJob(jobId);
  };
  render() {
    const { job, loading } = this.props.jobs;
    let content;
    if (job === null || loading) {
      content = <Loader type="Oval" color="#00BFFF" height="100" width="100" />;
    } else {
      content = (
        <Fragment>
          <Jumbo heading={job[0].title} lead={job[0].location} />
          <div className="album py-5 bg-light">
            <div className="container">
              <div className="row">
                <div
                  className="col-sm-12"
                  dangerouslySetInnerHTML={{ __html: job[0].body }}
                />
              </div>
              <div className="row text-center">
                <div className="col-sm-12">
                  <p>
                    <Link
                      to={`/prijava/${this.props.match.params.id}`}
                      className="btn btn-primary my-2"
                    >
                      Prijavi se
                    </Link>
                    <a href="/" className="btn btn-secondary my-2">
                      Podeli
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      );
    }
    return content;
  }
}

const mapStateToProps = state => ({
  jobs: state.jobs
});

export default connect(
  mapStateToProps,
  { getSingleJob }
)(SingleJob);

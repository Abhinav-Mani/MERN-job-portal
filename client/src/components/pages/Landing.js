import React, { Component, Fragment } from 'react';
import Jumbo from '../layout/Jumbo';
import JobWrapper from '../layout/JobWrapper';
import JobCard from '../layout/JobCard';
import { connect } from 'react-redux';
import { getJobs } from '../../actions/jobActions';
import Loader from 'react-loader-spinner';

class Landing extends Component {
  state = {
    heading: 'Postani deo pobedničkog tima!',
    lead:
      'Postanite deo, najveće kompanije u oblasti keramičkih pločica, i opreme za kupatila.'
  };
  componentDidMount = () => {
    setTimeout(this.props.getJobs(), 10000);
  };

  render() {
    const { loading, jobs } = this.props.jobs;
    let content;
    if (jobs === null || loading) {
      content = <Loader type="Oval" color="#00BFFF" height="100" width="100" />;
    } else {
      content = jobs.map(job => (
        <JobCard
          key={job.id}
          title={job.title}
          description={job.description}
          location={job.location}
          id={job.id}
        />
      ));
    }
    return (
      <Fragment>
        <Jumbo heading={this.state.heading} lead={this.state.lead} />
        <JobWrapper>{content}</JobWrapper>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  jobs: state.jobs
});

export default connect(
  mapStateToProps,
  { getJobs }
)(Landing);

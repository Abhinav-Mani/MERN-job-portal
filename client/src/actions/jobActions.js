import { GET_JOBS, JOBS_LOADING, GET_SINGLE_JOB } from './types';
import axios from 'axios';

export const getJobs = () => dispatch => {
  dispatch(setJobsLoading());
  axios
    .get('http://localhost:5000/jobs')
    .then(res =>
      dispatch({
        type: GET_JOBS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_JOBS,
        payload: {}
      })
    );
};

export const getSingleJob = param => dispatch => {
  dispatch(setJobsLoading());
  axios
    .get(`http://localhost:5000/jobs/${param}`)
    .then(res =>
      dispatch({
        type: GET_SINGLE_JOB,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_SINGLE_JOB,
        payload: {}
      })
    );
};
export const setJobsLoading = () => {
  return {
    type: JOBS_LOADING
  };
};

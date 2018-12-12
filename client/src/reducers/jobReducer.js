import { GET_JOBS, JOBS_LOADING, GET_SINGLE_JOB } from '../actions/types.js';

const initialState = {
  jobs: null,
  loading: false,
  job: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_JOB:
      return {
        ...state,
        job: action.payload,
        loading: false
      };
    case JOBS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_JOBS:
      return {
        ...state,
        jobs: action.payload,
        loading: false
      };
    default:
      return state;
  }
}

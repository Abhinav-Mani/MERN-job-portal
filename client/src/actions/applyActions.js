import { UPLOADING, UPLOAD_FILE } from './types';
import axios from 'axios';

export const uploadFile = data => dispatch => {
  dispatch(uploading());
  axios.post('http://localhost:5000/upload', {});
};

const uploading = () => {
  return {
    type: UPLOADING
  };
};

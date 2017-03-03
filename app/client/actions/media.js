import { request } from '../utils/api'

export const TYPES = {
  UPLOAD_MEDIA: 'UPLOAD_MEDIA'
};

export function uploadImage(data) {
  return dispatch => {
    request('/media/images', 'POST', data, false)
    .then(response => {
      dispatch({ type: TYPES.UPLOAD_MEDIA, data: response });
    })
    .catch(response => {
    });
  }
}

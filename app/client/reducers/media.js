import { TYPES } from '../actions/media'

const defaultState = {
  uploaded: false,
  path: null
};

export default function media(state = defaultState, action) {
  switch (action.type) {
    case TYPES.UPLOAD_MEDIA:

      return {uploaded: true, path: action.data.path}

    default:
      return state;
  }
}

import { produce } from 'immer';

const _initialState = { user: null, signed: false, loading: false };

export default function auth(state = _initialState, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@auth/SIGN_IN_REQUEST': {
        draft.loading = true;
        break;
      }

      case '@auth/SIGN_IN_SUCCESS': {
        draft.user = action.payload.user;
        draft.signed = true;
        draft.loading = false;
        break;
      }

      case '@auth/SIGN_FAILURE': {
        draft.loading = false;
        break;
      }

      case '@auth/SIGN_OUT': {
        draft.user = null;
        draft.signed = false;
        break;
      }

      default:
    }
  });
}

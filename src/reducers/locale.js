import {
  LOCALE_LOADING,
  LOCALE_SUCCESS,
  LOCALE_FAILURE,
} from '../constants/actions';

const initialState = {
  loading: false,
  data: {
    lang: 'en',
    dir: 'ltr',
    flag: '/image/english.png',
    messages: require('../../public/lang/en.json'),
  },
  error: false,
};

export default function locale(state = initialState, action) {
  switch (action.type) {
    case LOCALE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case LOCALE_SUCCESS:
      return {
        ...initialState,
        data: action.payload,
      };
    case LOCALE_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
}

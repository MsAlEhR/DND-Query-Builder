import {
  LOCALE_FAILURE,
  LOCALE_LOADING,
  LOCALE_SUCCESS,
} from '../constants/actions';
import {CONTEXT_PATH} from '../constants/local-urls';
import { simpleGetJson } from '../util/ajaxUtil';

export function localeLoading() {
  return {
    type: LOCALE_LOADING,
  };
}

export function localeSuccess({ lang, messages, dir, flag }) {
  return {
    type: LOCALE_SUCCESS,
    payload: {
      lang,
      messages,
      dir,
      flag,
    },
  };
}

export function localeFailure() {
  return {
    type: LOCALE_FAILURE,
  };
}

export function changeLocale() {
  return (dispatch, getState) => {
    const state = getState();
    if (state.locale.loading) return new Promise(resolve => resolve());
    dispatch(localeLoading());

    const currentLang = state.locale.data.lang;
    const currentDir = state.locale.data.dir;
    const newLang = currentLang === 'fa' ? 'en' : 'fa';
    const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
    const newFlag =
      currentLang === 'fa' ? '/image/persian.png' : '/image/english.png';

    // return simpleGetJson(`../../../lang/${newLang}.json`)
    return simpleGetJson(`${CONTEXT_PATH}/lang/${newLang}.json`)
      .then(resp =>
        dispatch(
          localeSuccess({
            lang: newLang,
            messages: resp,
            dir: newDir,
            flag: newFlag,
          }),
        ),
      )
      .catch(err => dispatch(localeFailure(err)));
  };
}

export function setLocale(locale) {
  return (dispatch, getState) => {
    const state = getState();
    if (state.locale.loading) return new Promise(resolve => resolve());
    dispatch(localeLoading());
    let newLang, newDir;
    if (locale !== undefined) {
      newLang = locale.lang;
      newDir = locale.dir;
    } else {
      newLang = state.locale.data.lang;
      newDir = state.locale.data.dir;
    }
    const newFlag =
      newLang === 'fa' ? '/image/english.png' : '/image/persian.png';

    return simpleGetJson(`../../lang/${newLang}.json`)
      .then(resp =>
        dispatch(
          localeSuccess({
            lang: newLang,
            messages: resp,
            dir: newDir,
            flag: newFlag,
          }),
        ),
      )
      .catch(err => dispatch(localeFailure(err)));
  };
}

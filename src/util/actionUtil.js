import { ErrorType, MessageType } from '../constants/general';
import { responseType } from '../constants/rest';
import { goTo } from './generalUtil';
import { openMessage } from '../actions/message';
import { CONTEXT_PATH } from '../constants/local-urls';

export function handleResponse(
  response,
  dispatch,
  successAction,
  failureAction,
) {
  if (response.type === responseType.SUCCESS) {
    if (response.message !== null && response.message.trim() !== '') {
      dispatch(openMessage(response.message, MessageType.SUCCESS));
    }
    return dispatch(successAction(response));
  } else if (response.type === responseType.FAILURE) {
    dispatch(openMessage(response.message, MessageType.ERROR));
    return dispatch(failureAction(ErrorType.BUSINESS_ERROR, response.message));
  } else if (response.type === ErrorType.UN_AUTHENTICATED) {
    goTo(`${CONTEXT_PATH}/login`);
    return dispatch(
      failureAction(ErrorType.UN_AUTHENTICATED, 'system.unAuthenticatedError'),
    );
  } else if (response.type === ErrorType.UN_AUTHORIZED) {
    dispatch(openMessage(response.message, MessageType.ERROR));
    return dispatch(failureAction(ErrorType.UN_AUTHORIZED, response.message));
  } else if (response.type === ErrorType.SERVER_ERROR) {
    dispatch(openMessage(response.message, MessageType.ERROR));
    return dispatch(failureAction(ErrorType.SERVER_ERROR, response.message));
  }
  throw new Error(response.message);
}

export function responseIsErrorFree(errorField) {
  return errorField === ErrorType.NONE;
}

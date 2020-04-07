import { CONTEXT_PATH } from '../constants/local-urls';

export function isNotAuthenticated(context) {
  const getState = context.store.getState;
  const token = getState().authentication.data.token;
  return token === undefined;
}

export const defaultUnauthorizedPath = {
  redirect: `${CONTEXT_PATH}/login`,
};

export function securedPage(context, page) {
  if (isNotAuthenticated(context)) {
    return defaultUnauthorizedPath;
  }

  return page;
}

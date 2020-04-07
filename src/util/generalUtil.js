import history from "../history";

export function arrayIsEmpty(arr) {
  return arr === undefined || arr.length === 0;
}

export function handleMessageField(srcObj, destObj) {
  const tempDestObj = destObj;
  if (srcObj.hasOwnProperty("message") && srcObj.message !== "") {
    tempDestObj.message = srcObj.message;
  }
  return tempDestObj;
}

export function isNotEmpty(str) {
  return str && str !== "";
}

export function isEmpty(str) {
  return !isNotEmpty(str);
}

export function getToken(getState) {
  const state = getState();
  return state.authentication.data.token;
}

export function getLanguage(getState) {
  const state = getState();
  return state.locale.data.lang;
}

export function goTo(url) {
  history.push(url);
}

export function objectFilter(obj, predicate) {
  return Object.keys(obj)
    .filter(key => predicate(obj[key]))
    .reduce((res, key) => Object.assign(res, { [key]: obj[key] }), {});
}

import fetch from "isomorphic-fetch";
import { ErrorType } from "../constants/general";
// import { responseType } from '../constants/rest';

function fixResponse(resp) {
  switch (resp.status) {
    case 200:
      return resp.json();
    case 401:
      return resp
        .json()
        .then(d => ({ type: ErrorType.UN_AUTHENTICATED, message: d.message }));
    case 500:
      return { type: ErrorType.SERVER_ERROR, response: resp };
    default:
      return { type: ErrorType.GENERAL_ERROR, response: resp };
  }
}

export const getJson = (url, token) => {
  const options = {
    method: "GET",
    headers: {
      "content-type": "application/json; charset=utf-8"
    }
  };
  if (token) options.headers.Authorization = `bearer ${token}`;
  return fetch(url, options)
    .then(resp => fixResponse(resp))
    .catch(err => new Promise((resolve, reject) => reject(err)));
};

export const postJson = (url, body, token) => {
  const options = {
    method: "POST",
    mode: "cors",
    headers: {
      "content-type": "application/json; charset=utf-8"
    },
    body: JSON.stringify(body)
  };
  if (token) options.headers.Authorization = `bearer ${token}`;

  return fetch(url, options)
    .then(resp => fixResponse(resp))
    .catch(err => new Promise((resolve, reject) => reject(err)));
};

export const deleteJson = (url, token) => {
  const options = {
    method: "DELETE",
    headers: {
      "content-type": "application/json; charset=utf-8"
    }
  };
  if (token) options.headers.Authorization = `bearer ${token}`;
  return fetch(url, options)
    .then(resp => fixResponse(resp))
    .catch(err => new Promise((resolve, reject) => reject(err)));
};

export const putJson = (url, body, token) => {
  const options = {
    method: "PUT",
    mode: "cors",
    headers: {
      "content-type": "application/json; charset=utf-8"
    },
    body: JSON.stringify(body)
  };
  if (token) options.headers.Authorization = `bearer ${token}`;

  return fetch(url, options)
    .then(resp => fixResponse(resp))
    .catch(err => new Promise((resolve, reject) => reject(err)));
};

export const simpleGetJson = url =>
  fetch(url)
    .then(resp => {
      if (resp.status / 100 === 2) return resp.json();
      return new Promise((resolve, reject) => reject());
    })
    .catch(err => new Promise((resolve, reject) => reject(err)));

export const sendBeacon = (url, body, token) => {
  const options = {
    method: "POST",
    mode: "cors",
    headers: {
      "content-type": "application/json; charset=utf-8",
      Authorization: `bearer ${token}`
    },
    body: JSON.stringify(body)
  };

  if (!navigator.sendBeacon) {
    fetch(url, options);
  } else {
    navigator.sendBeacon(url, options);
  }
};

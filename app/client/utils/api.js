import config from '../config/app'
import fetch from 'isomorphic-fetch'

const API_HOST = config.host;
const PATH_PREFIX = '/api';

function encodeData(data) {
  return stringifyQuery(data);
}

export function getAPIURL(endpoint) {
  return API_HOST + PATH_PREFIX + endpoint;
}

export function request(
  endpoint,
  method = 'GET',
  data = {},
  isJSON = true
) {
  return new Promise(function(resolve, reject) {
    const options = {
      url: getAPIURL(endpoint),
      method,
      headers: {
        'Client-Type': 'Web',
        //'X-CSRF-Token': null,
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      timeout: 30 * 1000,
    };

    // Limit API requests to GET and POST requests only. We use the `X-HTTP-Method-Override` to
    // alter the HTTP method when proxying to API.
    // if (method !== 'GET' && method !== 'POST') {
    //   options.method = 'POST';
    //   options.headers['X-HTTP-Method-Override'] = method;
    // }

    if (typeof localStorage != 'undefined' && localStorage.getItem('token')) {
      options.headers['Authorization'] = 'Basic ' + localStorage.getItem('token');
    }
    if (isJSON) {
      options.headers['Content-Type'] = 'application/json; charset=utf-8';
    }


    for (const key in data) {
      if (data[key] === undefined || (method === 'GET' && data[key] === null)) {
        delete data[key];
      }
    }

    if (isJSON) {
      options.body = JSON.stringify(data);
    } else {
      options.body = data;
    }

    if (method === 'GET') {
      if (data) {
        options.url += encodeData(data);
        data = {};
        options.body = null;
      }
    }

    fetch(options.url, {
      method: options.method,
      headers: options.headers,
      body: options.body,
      credentials: 'same-origin'
    }).then(
      response => response.json()
      .then(json => {
        return {
          response: json,
          status: response.ok
        }
      }))
      .then(({response, status}) => {
        if (status) {
          resolve(response);
        } else {
          reject(response);
        }
      });
    });
  }

  export function stringifyQuery(data) {
    return Object.keys(data).length > 0
      ? '?' + Object.keys(data).map(function(key) {
          return encodeURIComponent(key) + '=' +
          encodeURIComponent(data[key]);
        }).join('&')
      : '';
  }

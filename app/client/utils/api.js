const API_HOST = '';
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
  data = null,
  isJSON = true
) {
  return new Promise(function(resolve, reject) {
    const options = {
      url: getAPIURL(endpoint),
      method,
      headers: {
        'Client-Type': 'Web',
        'X-CSRF-Token': null,
        'Accept': 'application/json',
        'Content-Type': (
          isJSON ?
            'application/json; charset=utf-8' :
            'application/x-www-form-urlencoded; charset=utf-8'
        ),
        'X-Requested-With': 'XMLHttpRequest',
      },
      timeout: 30 * 1000,
    };

    // Limit API requests to GET and POST requests only. We use the `X-HTTP-Method-Override` to
    // alter the HTTP method when proxying to API.
    // if (method !== 'GET' && method !== 'POST') {
    //   options.method = 'POST';
    //   options.headers['X-HTTP-Method-Override'] = method;
    // }



    // always omit undefined
    // XXX We allow explicitly setting null to accomodate de-linking a class from an org. 💩
    // This behavior is otherwise deprecated and should not be relied on.
    for (const key in data) {
      if (data[key] === undefined || (method === 'GET' && data[key] === null)) {
        delete data[key];
      }
    }

    if (isJSON) {
      options.body = JSON.stringify(data);
    } else {
      options.body = JSON.stringify(data);
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
      'credentials': 'include'
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
    })


}

export function stringifyQuery(data) {
    return '?' +
        Object.keys(data).map(function(key) {
            return encodeURIComponent(key) + '=' +
                encodeURIComponent(data[key]);
        }).join('&');
}

import assert from 'assert'
import request from 'request'

describe('API tests', () => {
  it('send message', (done) => {
    request({
      method: 'GET',
      uri: 'http://localhost:9000/api/users/v',
      'content-type': 'application/json'
    },
    (err, res, body) => {
      assert.deepEqual(JSON.parse(body), { error: 'Access danied' });
      done();
    })
  });
});

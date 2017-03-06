import Base from './base'
import { ObjectID } from 'mongodb'

export default class Sessions extends Base {
  constructor() {
    super();
  }

  create(session) {
    return new Promise((resolve, reject) => {

      this.removeByUserId(session.user._id)
      .then(() => {
      let date = new Date();
      date.setSeconds(date.getSeconds() + 60 * 60 * 24)
      this.connection
        .collection('sessions').insertOne({
          token: session.token,
          // Two days
          expires: date,
          user: session.user || {}
        })
        .then(result => resolve(result.ops[0]))
        .catch(e => reject(e));
    });
  });
  }


  get(id) {
    return new Promise((resolve, reject) => {
      this.connection
      .collection('sessions')
      .findOne({'_id': new ObjectID(id)})
      .then(session => {
        resolve(session);
      })
      .catch(e => reject(e));
    });
  }

  removeByUserId(id) {
    return new Promise((resolve, reject) => {
      this.connection
      .collection('sessions')
      .remove({ 'user._id' : new ObjectID(id) }

      )
      .then(result => {
        resolve(result);
      })
      .catch(e => reject(e));
    });
  }

  getByToken(token) {
    return new Promise((resolve, reject) => {
      this.connection
      .collection('sessions')
      .findOne({'token': token})
      .then(session => {
        resolve(session);
      })
      .catch(e => reject(e));
    });
  }

}

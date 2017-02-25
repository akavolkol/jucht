import Base from './base'
import { ObjectID } from 'mongodb'

export default class Users extends Base {
  constructor() {
    super();
  }
  getUser(id) {
    return new Promise((resolve, reject) => {
      this.connection
        .collection('users')
        .find({'_id': new ObjectID(id)}, { password: false })
        .toArray(function (err, user) {
          err && reject(err);
          resolve(user);
        });
    });
  }

  findByUsername(username, exceptId = null) {
    return new Promise((resolve, reject) => {
      this.connection
      .collection('users')
      .find({
        _id: { $ne: exceptId && new ObjectID(exceptId) },
        username: username
      })
      .toArray(function (err, result) {
        resolve(result);
      });
    });

  }
}

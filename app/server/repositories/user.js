import Base from './base'
import { ObjectID } from 'mongodb'
import bcrypt from 'bcryptjs'

export default class Users extends Base {
  constructor() {
    super();
  }

  create(user) {
    return new Promise((resolve, reject) => {
      this.checkIfExist(user).then(() => {
    bcrypt.hash(user.password, 10, (err, hash) => {
      if (err) reject(err);
      user = {
        username: user.username,
        email: user.email,
        passwordHash: hash,
        firstName: user.firstName || null,
        lastName: user.lastName || null
      };
      this.connection
        .collection('users').insertOne(user, { passwordHash: false })
  		  .then(result => resolve(result.ops[0]))
  		  .catch(e => reject(e));
    });
  })
  .catch(e => reject(e));;
});
  }

  checkIfExist(user) {
    return new Promise((resolve, reject) => {
    this.connection
      .collection('users')
      .findOne({ $or: [{ username: user.username }, { email: user.email }]})
  	  .then((doc) => {
    		if (doc === null) {
    			resolve(true);
    		} else if (doc.username === user.username) {
    			reject(new Error('The username provided has already been registered.'));
    		} else if (doc.email === user.email) {
    			reject(new Error('The email provided has already been registered.'));
    		}
  	  })
      .catch(err => reject(err));
    });
  }

  getUser(id, allFields = false) {
    return new Promise((resolve, reject) => {
      this.connection
        .collection('users')
        .findOne({'_id': new ObjectID(id)}, { passwordHash: allFields ? true : false })
        .then(user => {
          resolve(user);
        })
        .catch(e => reject(e));
    });
  }

  getUserAllDataByUsername(username) {
    return new Promise((resolve, reject) => {
      this.connection
        .collection('users')
        .findOne({username: username})
        .then(user => {
          resolve(user);
        })
        .catch(e => reject(e));
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

  update(userId, user) {
    delete user._id;
    return new Promise((resolve, reject) => {
      this.getUser(userId, true).then(oldUser => {
        this.connection
          .collection('users')
          .findOneAndUpdate(
            { _id: new ObjectID(userId)},
            { ...oldUser, ...user}
          )
          .then((result) => {
              resolve({ ...result.value, ...user });
            }
          )
          .catch((e) => reject(e));
        })
        .catch((e) => reject(e));
      });
    }
}

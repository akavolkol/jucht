import { MongoClient } from 'mongodb'

// Singleton
let instance = null;

export default class Mongo {

  constructor(config) {
    this.config = config;
    if (!instance) {
      instance = this;
    }

    return instance;
  }

  /**
   * Set connection with DB
   */
  connect() {
    return new Promise((resolve, reject) => {
      MongoClient.connect(this.config.host, (err, database) => {
        if(err) reject(err);
        this.connection = database;
        resolve(database);
      });
    })

  }
}

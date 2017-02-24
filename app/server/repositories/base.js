import Mongo from '../db/mongo'

export default class Base {
  constructor() {
    this.connection = new Mongo().connection;
  }
}

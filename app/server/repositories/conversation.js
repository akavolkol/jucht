import Base from './base'
import { ObjectID } from 'mongodb'

export default class Conversation extends Base {
  constructor() {
    super();
  }

  get(id) {
    return this.connection
      .collection('conversations')
      .find({'_id': new ObjectID(id)})
      .toArray();
  }

  list() {
    return this.connection
      .collection('conversations')
      .find()
      .toArray();
  }

  create(conversation) {
    conversation = {
      createdAt: conversation.createdAt || new Date(),
      participants: conversation.participants || [],
      messages: []
    }

    return new Promise((resolve, reject) => {
      this.connection
        .collection('conversations')
        .insertOne(conversation,
        (err, result) => {
          resolve(result.ops[0]);
        }
      );
    });
  }

}

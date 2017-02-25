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

  listByParticipant(id) {
    return this.connection
      .collection('conversations')
      .find({ participants :
              { $elemMatch :
                { _id : id }
              }
      })
      .toArray();
  }

  create(conversation) {
    conversation = {
      createdAt: conversation.createdAt || new Date(),
      participants: conversation.participants || [],
      messages: [],
      ownerId:  new ObjectID(conversation.ownerId)
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

  addMessage(conversationId, message) {
    message = {
      createdAt: message.createdAt || new Date(),
      text: message.text || '',
      author: message.author
    }

    return new Promise((resolve, reject) => {
      this.connection
        .collection('conversations')
        .update({ _id: new ObjectID(conversationId) },
          { $push: { messages: message } },
          (err, result, object) => {
            resolve(message);
          }
        );
    });
  }

  removeParticipant(conversationId, participantId) {
    return new Promise((resolve, reject) => {
    this.connection
      .collection('conversations')
      .update({ _id: conversationId },
        { $pull: { participants: { _id: new ObjectID(participantId) } } },
        (err, result) => {
          (err || result.result.nModified == 0) && reject(new Error('Can\'t remove participant'));
          resolve(result);
        }
      );
    });
  }

}

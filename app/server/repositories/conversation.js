import Base from './base'
import { ObjectID } from 'mongodb'
import BadRequestError from '../errors/badRequest'
import NotFoundError from '../errors/notFound'

export default class Conversation extends Base {
  constructor() {
    super();
  }

  get(id) {
    return new Promise((resolve, reject) => {
      this.connection
        .collection('conversations')
        .find({'_id': new ObjectID(id)})
        .toArray()
        .then((conversation) => {
          if (conversation.length == 0) {
            reject(new NotFoundError('Conversation with this id not found'));
          } else {
            resolve(conversation[0]);
          }
        });
    })
  }

  remove(id) {
    return new Promise((resolve, reject) => {
      this.connection
        .collection('conversations')
        .remove({'_id': new ObjectID(id)})
        .then(result => resolve(result));
    });
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
      _id: new ObjectID(),
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

  /**
   * Remove message from conversation
   */
  removeMessage(conversationId, messageId) {
    if (!messageId) {
      throw new BadRequestError('The id\'s of participant and message should exists');
    }

    return new Promise((resolve, reject) => {
    this.connection
      .collection('conversations')
      .update({ _id: new ObjectID(conversationId) },
        { $pull: { messages: { _id: new ObjectID(messageId) } } },
        (err, result) => {
          (err || result.result.nModified == 0) && reject(new Error(err || 'Can\'t remove message'));
          resolve(result);
        }
      );
    });
  }

  removeParticipant(conversationId, participantId) {
    if (!participantId) {
      throw new BadRequestError('The id\'s of participant and converstaion should exists');
    }

    return new Promise((resolve, reject) => {
    this.connection
      .collection('conversations')
      .update({ _id: new ObjectID(conversationId) },
        { $pull: { participants: { _id: participantId } } },
        (err, result) => {
          (err || result.result.nModified == 0) && reject(new Error(err || 'Can\'t remove participant'));
          resolve(result);
        }
      );
    });
  }

}

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
        .findOne({'_id': new ObjectID(id)})
        .then((conversation) => {
          if (!conversation) {
            reject(new NotFoundError('Conversation with this id not found'));
          } else {
            resolve(conversation);
          }
        })
        .catch(e => reject(e));
    })
  }

  remove(id) {
    return new Promise((resolve, reject) => {
      this.connection
        .collection('conversations')
        .remove({'_id': new ObjectID(id)})
        .then(result => resolve(result))
        .catch(e => reject(e));
    });
  }

  list() {
    return this.connection
      .collection('conversations')
      .find()
      .toArray();
  }

  listByParticipant(id) {
    return new Promise((resolve, reject) => {
    this.connection
      .collection('conversations')
      .find({ participants :
              { $elemMatch :
                { _id : new ObjectID(id) }
            }
      })
      .toArray((err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      })
    });

  }

  create(conversation) {
    conversation.participants.map(participant => {
      participant._id = new ObjectID(participant._id);

    })
    conversation = {
      createdAt: conversation.createdAt || new Date(),
      participants: conversation.participants || [],
      messages: [],
      ownerId:  new ObjectID(conversation.ownerId)
    }

    return new Promise((resolve, reject) => {
      this.connection
        .collection('conversations')
        .insertOne(conversation)
        .then(result => {
          resolve(result.ops[0]);
        })
        .catch(e => reject(e));
    });
  }

  addMessage(conversationId, message) {
    message = {
      _id: new ObjectID(),
      createdAt: message.createdAt || new Date(),
      text: message.text || '',
      author: {
        ...message.author,
        _id: new ObjectID(message.author._id)
      },
      updatedAt: null
    }

    return new Promise((resolve, reject) => {
      this.connection
        .collection('conversations')
        .update({ _id: new ObjectID(conversationId) }, { $push: { messages: message } })
        .then(() => resolve(message))
        .catch(e => reject(e));
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
      .update({ _id: new ObjectID(conversationId) }, { $pull: { messages: { _id: new ObjectID(messageId) } } })
      .then(result => {
          if (result.result.nModified == 0) {
            throw new Error(err || 'Can\'t remove message');
          }
          resolve(result);
      })
      .catch(e => reject(e));
    });
  }

  getMessage(conversationId, messageId) {
    return new Promise((resolve, reject) => {
      this.connection
        .collection('conversations')
        .findOne({ _id: new ObjectID(conversationId), 'messages._id': new ObjectID(messageId) })
        .then((result) => resolve(result.messages[0]))
        .catch(e => reject(e));
    });
  }

  updateMessage(conversationId, messageId, message) {
    return new Promise((resolve, reject) => {
      this.getMessage(conversationId, messageId)
        .then((oldMessage) => {
          const newMessage = {...oldMessage, text: message.text, updatedAt: new Date() };

          this.connection
            .collection('conversations')
            .findOneAndUpdate(
              { _id: new ObjectID(conversationId), 'messages._id': new ObjectID(messageId) },
              { $set: { 'messages.$': newMessage } },
            )
            .then((result) => resolve(newMessage))
            .catch((e) => reject(e));
          })
          .catch((e) => reject(e));;
    });
  }

  removeParticipant(conversationId, participantId) {
    if (!participantId) {
      throw new BadRequestError('The id\'s of participant and converstaion should exists');
    }

    return new Promise((resolve, reject) => {
      this.connection
        .collection('conversations')
        .update({ _id: new ObjectID(conversationId) }, { $pull: { participants: { _id: participantId } } })
        .then(result => {
            if (result.result.nModified == 0) throw new Error(err || 'Can\'t remove participant');
            resolve(result);
        })
        .catch(e => reject(e));
    });
  }
}

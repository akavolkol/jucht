import { Router } from 'express'
import Conversation from '../../repositories/conversation'

export default function () {
  const router = Router();
  const conversationRepository = new Conversation();

  /**
   * List of available converstaions
   */
  router.get('/', (request, response, next) => {
    conversationRepository.listByParticipant(request.session.user._id)
      .then((conversations) => response.json(conversations))
      .catch(next);
  });

  /**
   * Receive data from certain converstaion
   */
  router.get('/:id', (request, response, next) => {
    conversationRepository.get(request.params.id)
      .then((conversation) => response.json(conversation))
      .catch(next);
  });

  /**
   * Remove conversation
   * @type {String}
   */
  router.delete('/:id', (request, response, next) => {
    conversationRepository.remove(request.params.id)
      .then((conversation) => {
          response.json({message: 'Removed'});
      })
      .catch(next);
  });

  /**
   * Join new converstaion
   */
  router.post('/', (request, response, next) => {
    conversationRepository.create(request.body)
      .then((conversation) => response.status(201).json(conversation))
      .catch(next);
  });

  /**
   * Add message
   */
  router.post('/:id/messages', (request, response, next) => {
    conversationRepository.addMessage(request.params.id, request.body)
      .then((conversation) => response.status(201).json(conversation))
      .catch(next);
  });

  /**
   * Remove conversation
   * @type {String}
   */
  router.delete('/:conversationId/messages/:messageId', (request, response, next) => {
    conversationRepository.removeMessage(request.params.conversationId, request.params.messageId)
      .then((conversation) => {
          response.json({message: 'Removed'})
      })
      .catch(next);
  });

  /**
   * Update message in conversation
   * @type {String}
   */
  router.put('/:conversationId/messages/:messageId', (request, response, next) => {
    conversationRepository.updateMessage(request.params.conversationId, request.params.messageId, request.body)
      .then((message) => {
          response.json(message);
      })
      .catch(next);
  });

  /**
   * Leave conversation
   */
  router.put('/:id/leave', (request, response, next) => {
    conversationRepository.removeParticipant(request.params.id, request.session.user._id)
      .then(() => response.json({ message: 'Leaved' }))
      .catch(e => next(e));
  });

  return router;
}

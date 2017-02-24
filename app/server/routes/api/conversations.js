import express, { Router } from 'express'
import Conversation from '../../repositories/conversation'

export default function () {
  const router = Router();
  const conversationRepository = new Conversation();

  /**
   * List of available converstaions
   */
  router.get('/', (req, res) => {
    conversationRepository.list()
      .then((conversations) => res.json(conversations));
  });

  /**
   * Receive data from certain converstaion
   */
  router.get('/:id', (req, res) => {
    conversationRepository.get(req.params.id)
      .then((conversation) => {
        if (conversation.length == 0) {
          res.status(404).json({message: 'Not found'});
        } else {
          res.json(conversation[0]);
        }
      });
  });

  /**
   * Join new converstaion
   */
  router.post('/', (req, res) => {
    conversationRepository.create(req.body)
      .then((conversation) => res.status(201).json(conversation));
  });



  return router;
}

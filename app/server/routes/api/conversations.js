import express, { Router } from 'express'
import Conversation from '../../repositories/conversation'

export default function () {
  const router = Router();
  const conversationRepository = new Conversation();

  /**
   * List of available converstaions
   */
  router.get('/', (req, res) => {
    conversationRepository.listByParticipant(req.session.userId)
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
      })
      .catch(e => console.log(e));
  });

  /**
   * Join new converstaion
   */
  router.post('/', (req, res) => {
    conversationRepository.create(req.body)
      .then((conversation) => res.status(201).json(conversation));
  });

  /**
   * Add message
   */
  router.post('/:id/messages', (req, res) => {
    conversationRepository.addMessage(req.params.id, req.body)
      .then((conversation) => res.status(201).json(conversation))
        .catch(e => console.log(e));
  });

  /**
   * Add message
   */
  router.put('/:id/leave', (req, res) => {
    conversationRepository.removeParticipant(req.params.id, req.body.userId)
      .then(() => res.json({ message: 'Leaved' }))
      .catch((e) => res.status(500).json({ message: 'Can\'t leave' }));
  });



  return router;
}

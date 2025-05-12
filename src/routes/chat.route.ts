import express, { NextFunction, Request } from 'express';
import { ResponseType } from '../types';
import { chatController } from '../controllers';

export const chatRouter = express.Router();

chatRouter.post(
  '/',
  async function (req: Request, res: ResponseType<any>) {
    const { body } = req;
    try {
      const message = await chatController.create(body);
      res.status(201).send(message);
    } catch (error) {
      res.status(500).send(['Failed to send message']);
    }
  },
);

chatRouter.get(
  '/',
  async function (req: Request, res: ResponseType<any[]>) {
    const { sender, receiver } = req.query;
    if (typeof sender !== 'string' || typeof receiver !== 'string') {
      return res.status(400).send(['Sender and receiver must be strings']);
    }
    try {
      const result = await chatController.getAll(sender, receiver);
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send(['Failed to fetch messages']);
    }
  },
);

// New endpoint to get unread messages count
chatRouter.get(
  '/unread-count/:userId',
  async function (req: Request, res: ResponseType<number>) {
    const { userId } = req.params;
    try {
      const count = await chatController.getUnreadCount(userId);
      res.status(200).send(count);
    } catch (error) {
      res.status(500).send(0);
    }
  },
);

// New endpoint to mark messages as read
chatRouter.put(
  '/mark-as-read',
  async function (req: Request, res: ResponseType<void>) {
    const { sender, receiver } = req.body;
    try {
      await chatController.markAsRead(sender, receiver);
      res.status(200).send();
    } catch (error) {
      res.status(500).send();
    }
  },
);

chatRouter.get(
  '/users-by-role',
  async function (req: Request, res: ResponseType<any[]>) {
    const { role, userId } = req.query;
    
    if (typeof role !== 'string' || typeof userId !== 'string') {
      return res.status(400).send(['Role and userId must be strings']);
    }
    
    try {
      const users = await chatController.getUsersByRoleWithUnread(role, userId);
      res.status(200).send(users);
    } catch (error) {
      res.status(500).send([]);
    }
  },
);
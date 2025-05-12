/*
 * Developer: Mohamed Aziz Louhichi
 * Company: None
 * Date: 08/04/2025
 */

import express, { Request } from 'express';
import { ResponseType } from '../types';
import { commentController, postController } from '../controllers';

export const postRouter = express.Router();

postRouter.post(
  '/',
  //!jwtService.verifyToken,
  //!ValidatorMiddleware.validateBody(postValidator.****),
  async function (req: Request, res: ResponseType<void>) {
    const { body } = req;
    await postController.create(body);
    res.status(201).send();
  },
);

postRouter.get(
  '/',
  //!jwtService.verifyToken,
  //!ValidatorMiddleware.validateQuery(postValidator.****),
  async function (req: Request, res: ResponseType<any[]>) {
    const result = await postController.getAll();
    res.status(200).send(result);
  },
);

// Comment routes
postRouter.post(
  '/:postId/comments',
  //!jwtService.verifyToken,
  async function (req: Request, res: ResponseType<any>) {
    await commentController.addComment(req, res);
    res.status(201).send();
  },
);

postRouter.get(
  '/:postId/comments',
  //!jwtService.verifyToken,
  async function (req: Request, res: ResponseType<any>) {
    await commentController.getComments(req, res);
  },
);
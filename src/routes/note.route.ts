/*
    * Developer: Mohamed Aziz Louhichi
    * Company: None
    * Date: 11/04/2025
    */


import express, { NextFunction, Request } from 'express';
import { ResponseType } from '../types';
import { noteController } from '../controllers';

export const noteRouter = express.Router();


noteRouter.post(
  '/',
  //!jwtService.verifyToken,
  //!ValidatorMiddleware.validateBody(noteValidator.****),
  async function (req: Request, res: ResponseType<void>) {
    const { body } = req
    await noteController.create(body);
    res.status(201).send();
  },
);

noteRouter.get(
  '/',
  //!jwtService.verifyToken,
  //!ValidatorMiddleware.validateQuery(noteValidator.****),
  async function (req: Request, res: ResponseType<any[]>) {
    const {userId } = req.query;
    const result = await noteController.getAll(userId as string);
    res.status(200).send(result);
  },
);

noteRouter.delete(
  '/:id',
  //!jwtService.verifyToken,
  //!ValidatorMiddleware.validateQuery(noteValidator.****),
  async function (req: Request, res: ResponseType<void>) {
    const { id } = req.params;
    await noteController.deleteOne(id);
    res.status(200).send();
  },
);



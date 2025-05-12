/*
    * Developer: Mohamed Aziz Louhichi
    * Company: None
    * Date: 03/03/2025
    */


import express, { NextFunction, Request } from 'express';
import { ResponseType } from '../types';
import { liveController } from '../controllers';

export const liveRouter = express.Router();


liveRouter.post(
  '/',
  //!jwtService.verifyToken,
  //!ValidatorMiddleware.validateBody(liveValidator.****),
  async function (req: Request, res: ResponseType<string>) {
    const { body } = req
    console.log(body);
    await liveController.create(body);
    res.status(201).send( "success");
  },
);

liveRouter.get(
  '/',
  //!jwtService.verifyToken,
  //!ValidatorMiddleware.validateQuery(liveValidator.****),
  async function (req: Request, res: ResponseType<any[]>) {
    const result = await liveController.getAll();
    res.status(200).send(result);
  },
);


liveRouter.delete(
  '/:id',
  //!jwtService.verifyToken,
  //!ValidatorMiddleware.validateParams(liveValidator.****),
  async function (req: Request, res: ResponseType<string>) {
    const { params } = req;
    await liveController.deleteOne(params.id);
    res.status(200).send("success");
  },
);




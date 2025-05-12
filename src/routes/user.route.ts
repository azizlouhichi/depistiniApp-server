/*
    * Developer: Mohamed Aziz Louhichi
    * Company: None
    * Date: 08/02/2025
    */


import express, { NextFunction, Request, Response } from 'express';
import { ResponseType } from '../types';
import { userController } from '../controllers';
import { validators } from '../middlewares';

export const userRouter = express.Router();

userRouter.post(
  '/',
  //!jwtService.verifyToken,
  //!ValidatorMiddleware.validateBody(userValidator.****),
  async function (req: Request, res: ResponseType<string>) {
    console.log('here')
    const { body } = req
    console.log(body)
    await userController.create(body);
    res.status(201).send("success");
  },
);

userRouter.post(
  '/signin',
  //!jwtService.verifyToken,
  //!ValidatorMiddleware.validateQuery(userValidator.****),
  async (req: Request<unknown, unknown, validators.SigninValidator>, res: Response) => {
    const { body } = req;
    const user = await userController.signIn(body);
    res.status(200).send({ access_token: user.token, _id: user.id, username: user.username, role: user.role });
  },
);

userRouter.get("/getByRole", async (req, res) => {
  try {
    const { role } = req.query;
    if (!role) return res.status(400).json({ message: "Role is required" });
    const users = await userController.getUsersByRole(role as string);
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
});

userRouter.get(
  '/getAll',
  //!jwtService.verifyToken,
  //!ValidatorMiddleware.validateQuery(userValidator.****),
  async function (req: Request, res: ResponseType<any[]>) {
    const result = await userController.getAll();
    res.status(200).send(result);
  },
);





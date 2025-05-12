import express, { Response } from 'express';
import { Send, ParamsDictionary, Query } from 'express-serve-static-core';
export interface ResponseType<ResBody> extends Response {
  send: Send<ResBody, this>;
}
export type CustomParamsType<T> = ParamsDictionary & T;
export type CustomQueryType<T> = Query & T;

/*
    * Developer: Mohamed Aziz Louhichi
    * Company: None
    * Date: 28/03/2025
    */

    


   
    import { ChatModelType } from '../types';
    import ChatModel from '../models/chat.model';
    import { FilterQuery, UpdateQuery } from 'mongoose';
    import { InternalServerError } from '../errors';

      export function createOne(chat: ChatModelType) {
        try {
          return  ChatModel.create(chat);
        } catch (error) {
        throw new InternalServerError('','chat.service createOne',chat  )
        }
      }

      export function createMany(chats: ChatModelType[] ) {
        try {
          return  ChatModel.insertMany(chats);
        } catch (error) {
        throw new InternalServerError('','chat.service createMany',chats  )
        }
      }
    
      export function getOne(filter: FilterQuery<ChatModelType>) {
        try {
          return  ChatModel.findOne(filter);
        } catch (error) {
        throw new InternalServerError('','chat.service getOne',filter  )
        }
      }
      export function getById(_id: string) {
        try {
          return  ChatModel.findById(_id);
        } catch (error) {
        throw new InternalServerError('','chat.service getById',{_id}  )
        }
      }

      export function getMany(filter: FilterQuery<ChatModelType>) {
        try {
          return  ChatModel.find(filter);
        } catch (error) {
        throw new InternalServerError('','chat.service getMany',filter  )
        }
      }

      export function count(filter: FilterQuery<ChatModelType>) {
        try {
          return  ChatModel.countDocuments(filter);
        } catch (error) {
        throw new InternalServerError('','chat.service count',filter  )
        }
      }

      


      export async function updateOne(filter: FilterQuery<ChatModelType>,update:UpdateQuery<ChatModelType>) {
        try {
          return  await ChatModel.updateOne(filter,update);
        } catch (error) {
        throw new InternalServerError('','chat.service updateOne',{filter,update}  )
        }
      }


      export async function updateMany(filter: FilterQuery<ChatModelType>,update:UpdateQuery<ChatModelType>) {
        try {
          return  await ChatModel.updateMany(filter,update);
        } catch (error) {
        throw new InternalServerError('','chat.service updateMany',{filter,update}  )
        }
      }

      export async function  getIdis(filter: FilterQuery<ChatModelType>) {
        try {
          return await ChatModel.find(filter).distinct('_id')
        } catch (error) {
        throw new InternalServerError('','chat.service getIdis',filter  )
        }
      }
    
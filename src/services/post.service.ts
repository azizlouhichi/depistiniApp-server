/*
    * Developer: Mohamed Aziz Louhichi
    * Company: None
    * Date: 08/04/2025
    */

    


   
    import { PostModelType } from '../types';
    import PostModel from '../models/post.model';
    import { FilterQuery, UpdateQuery } from 'mongoose';
    import { InternalServerError } from '../errors';

      export function createOne(post: PostModelType) {
        try {
          return  PostModel.create(post);
        } catch (error) {
        throw new InternalServerError('','post.service createOne',post  )
        }
      }

      export function createMany(posts: PostModelType[] ) {
        try {
          return  PostModel.insertMany(posts);
        } catch (error) {
        throw new InternalServerError('','post.service createMany',posts  )
        }
      }
    
      export function getOne(filter: FilterQuery<PostModelType>) {
        try {
          return  PostModel.findOne(filter);
        } catch (error) {
        throw new InternalServerError('','post.service getOne',filter  )
        }
      }
      export function getById(_id: string) {
        try {
          return  PostModel.findById(_id);
        } catch (error) {
        throw new InternalServerError('','post.service getById',{_id}  )
        }
      }

      export function getMany(filter: FilterQuery<PostModelType>) {
        try {
          return  PostModel.find(filter);
        } catch (error) {
        throw new InternalServerError('','post.service getMany',filter  )
        }
      }

      export function getAll() {
        try {
          return  PostModel.find();
        } catch (error) {
        throw new InternalServerError('','post.service getAll',{}  )
        }
      }

      export function count(filter: FilterQuery<PostModelType>) {
        try {
          return  PostModel.countDocuments(filter);
        } catch (error) {
        throw new InternalServerError('','post.service count',filter  )
        }
      }

      


      export async function updateOne(filter: FilterQuery<PostModelType>,update:UpdateQuery<PostModelType>) {
        try {
          return  await PostModel.updateOne(filter,update);
        } catch (error) {
        throw new InternalServerError('','post.service updateOne',{filter,update}  )
        }
      }


      export async function updateMany(filter: FilterQuery<PostModelType>,update:UpdateQuery<PostModelType>) {
        try {
          return  await PostModel.updateMany(filter,update);
        } catch (error) {
        throw new InternalServerError('','post.service updateMany',{filter,update}  )
        }
      }

      export async function  getIdis(filter: FilterQuery<PostModelType>) {
        try {
          return await PostModel.find(filter).distinct('_id')
        } catch (error) {
        throw new InternalServerError('','post.service getIdis',filter  )
        }
      }
    
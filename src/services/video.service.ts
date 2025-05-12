/*
    * Developer: Mohamed Aziz Louhichi
    * Company: None
    * Date: 02/04/2025
    */

    


   
    import { VideoModelType } from '../types';
    import VideoModel from '../models/video.model';
    import { FilterQuery, UpdateQuery } from 'mongoose';
    import { InternalServerError } from '../errors';

      export function createOne(video: VideoModelType) {
        try {
          return  VideoModel.create(video);
        } catch (error) {
        throw new InternalServerError('','video.service createOne',video  )
        }
      }

      export function createMany(videos: VideoModelType[] ) {
        try {
          return  VideoModel.insertMany(videos);
        } catch (error) {
        throw new InternalServerError('','video.service createMany',videos  )
        }
      }
    
      export function getOne(filter: FilterQuery<VideoModelType>) {
        try {
          return  VideoModel.findOne(filter);
        } catch (error) {
        throw new InternalServerError('','video.service getOne',filter  )
        }
      }
      export function getById(_id: string) {
        try {
          return  VideoModel.findById(_id);
        } catch (error) {
        throw new InternalServerError('','video.service getById',{_id}  )
        }
      }

      export function getMany(filter: FilterQuery<VideoModelType>) {
        try {
          return  VideoModel.find(filter);
        } catch (error) {
        throw new InternalServerError('','video.service getMany',filter  )
        }
      }

      export function findAll() {
        try {
          return  VideoModel.find().sort('-createdAt');
        } catch (error) {
        throw new InternalServerError('','video.service findAll',{}  )
        }
      }

      export function count(filter: FilterQuery<VideoModelType>) {
        try {
          return  VideoModel.countDocuments(filter);
        } catch (error) {
        throw new InternalServerError('','video.service count',filter  )
        }
      }

      


      export async function updateOne(filter: FilterQuery<VideoModelType>,update:UpdateQuery<VideoModelType>) {
        try {
          return  await VideoModel.updateOne(filter,update);
        } catch (error) {
        throw new InternalServerError('','video.service updateOne',{filter,update}  )
        }
      }


      export async function updateMany(filter: FilterQuery<VideoModelType>,update:UpdateQuery<VideoModelType>) {
        try {
          return  await VideoModel.updateMany(filter,update);
        } catch (error) {
        throw new InternalServerError('','video.service updateMany',{filter,update}  )
        }
      }

      export async function  getIdis(filter: FilterQuery<VideoModelType>) {
        try {
          return await VideoModel.find(filter).distinct('_id')
        } catch (error) {
        throw new InternalServerError('','video.service getIdis',filter  )
        }
      }
    
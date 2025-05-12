/*
    * Developer: Mohamed Aziz Louhichi
    * Company: None
    * Date: 03/03/2025
    */

    


   
    import { LiveModelType } from '../types';
    import LiveModel from '../models/live.model';
    import { FilterQuery, UpdateQuery } from 'mongoose';
    import { InternalServerError } from '../errors';

      export function createOne(live: LiveModelType) {
        try {
          return  LiveModel.create(live);
        } catch (error) {
        throw new InternalServerError('','live.service createOne',live  )
        }
      }

      export function createMany(lives: LiveModelType[] ) {
        try {
          return  LiveModel.insertMany(lives);
        } catch (error) {
        throw new InternalServerError('','live.service createMany',lives  )
        }
      }
    
      export function getOne(filter: FilterQuery<LiveModelType>) {
        try {
          return  LiveModel.findOne(filter);
        } catch (error) {
        throw new InternalServerError('','live.service getOne',filter  )
        }
      }
      export function getById(_id: string) {
        try {
          return  LiveModel.findById(_id);
        } catch (error) {
        throw new InternalServerError('','live.service getById',{_id}  )
        }
      }

      export function getMany(filter: FilterQuery<LiveModelType>) {
        try {
          return  LiveModel.find(filter);
        } catch (error) {
        throw new InternalServerError('','live.service getMany',filter  )
        }
      }

      export function count(filter: FilterQuery<LiveModelType>) {
        try {
          return  LiveModel.countDocuments(filter);
        } catch (error) {
        throw new InternalServerError('','live.service count',filter  )
        }
      }


      


      export async function updateOne(filter: FilterQuery<LiveModelType>,update:UpdateQuery<LiveModelType>) {
        try {
          return  await LiveModel.updateOne(filter,update);
        } catch (error) {
        throw new InternalServerError('','live.service updateOne',{filter,update}  )
        }
      }


      export async function updateMany(filter: FilterQuery<LiveModelType>,update:UpdateQuery<LiveModelType>) {
        try {
          return  await LiveModel.updateMany(filter,update);
        } catch (error) {
        throw new InternalServerError('','live.service updateMany',{filter,update}  )
        }
      }

      export async function  getIdis(filter: FilterQuery<LiveModelType>) {
        try {
          return await LiveModel.find(filter).distinct('_id')
        } catch (error) {
        throw new InternalServerError('','live.service getIdis',filter  )
        }
      }

      export async function  findAll() {
        try {
          return await LiveModel.find()
        } catch (error) {
        throw new InternalServerError('','live.service find all'  )
        }
      }

      export async function  deleteOne(_id: string) {
        try {
          return await LiveModel.deleteOne({liveID:_id})
        } catch (error) {
        throw new InternalServerError('','live.service deleteOne',{_id}  )
        }
      }
    
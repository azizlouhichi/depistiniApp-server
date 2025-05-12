/*
    * Developer: Mohamed Aziz Louhichi
    * Company: None
    * Date: 11/04/2025
    */

    


   
    import { NoteModelType } from '../types';
    import NoteModel from '../models/note.model';
    import { FilterQuery, UpdateQuery } from 'mongoose';
    import { InternalServerError } from '../errors';

      export function createOne(note: NoteModelType) {
        try {
          return  NoteModel.create(note);
        } catch (error) {
        throw new InternalServerError('','note.service createOne',note  )
        }
      }

      export function createMany(notes: NoteModelType[] ) {
        try {
          return  NoteModel.insertMany(notes);
        } catch (error) {
        throw new InternalServerError('','note.service createMany',notes  )
        }
      }
    
      export function getOne(filter: FilterQuery<NoteModelType>) {
        try {
          return  NoteModel.findOne(filter);
        } catch (error) {
        throw new InternalServerError('','note.service getOne',filter  )
        }
      }
      export function getById(_id: string) {
        try {
          return  NoteModel.findById(_id);
        } catch (error) {
        throw new InternalServerError('','note.service getById',{_id}  )
        }
      }

      export function getMany(filter: FilterQuery<NoteModelType>) {
        try {
          return  NoteModel.find(filter);
        } catch (error) {
        throw new InternalServerError('','note.service getMany',filter  )
        }
      }

      export function getAll() {
        try {
          return  NoteModel.find();
        } catch (error) {
        throw new InternalServerError('','note.service getAll',{}  )
        }
      }

      export function count(filter: FilterQuery<NoteModelType>) {
        try {
          return  NoteModel.countDocuments(filter);
        } catch (error) {
        throw new InternalServerError('','note.service count',filter  )
        }
      }

      


      export async function updateOne(filter: FilterQuery<NoteModelType>,update:UpdateQuery<NoteModelType>) {
        try {
          return  await NoteModel.updateOne(filter,update);
        } catch (error) {
        throw new InternalServerError('','note.service updateOne',{filter,update}  )
        }
      }


      export async function updateMany(filter: FilterQuery<NoteModelType>,update:UpdateQuery<NoteModelType>) {
        try {
          return  await NoteModel.updateMany(filter,update);
        } catch (error) {
        throw new InternalServerError('','note.service updateMany',{filter,update}  )
        }
      }

      export async function  getIdis(filter: FilterQuery<NoteModelType>) {
        try {
          return await NoteModel.find(filter).distinct('_id')
        } catch (error) {
        throw new InternalServerError('','note.service getIdis',filter  )
        }
      }
    
      export async function deleteOne(_id: string) {
        try {
          return await NoteModel.deleteOne({ _id });
        } catch (error) {
        throw new InternalServerError('','note.service deleteOne',{_id}  )
        }
      }
/*
    * Developer: Mohamed Aziz Louhichi
    * Company: None
    * Date: 11/04/2025
    */ 
 

    
import { Schema, model, Types, Document } from 'mongoose';
import {  NoteModelType } from '../types';





export const noteSchema = new Schema<NoteModelType>(
 {
  userId: { type: String,ref: 'users', required: true },
  content: { type: String, required: true },
  date: { type: String },
 },
  { timestamps: true },
);


const NoteModel = model<NoteModelType>('note', noteSchema);


export default NoteModel;
    
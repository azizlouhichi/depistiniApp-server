/*
    * Developer: Mohamed Aziz Louhichi
    * Company: None
    * Date: 03/03/2025
    */ 
 

    
import { Schema, model, Types, Document } from 'mongoose';
import {  LiveModelType } from '../types';





export const liveSchema = new Schema<LiveModelType>(
 {
  liveID: { type: String,ref: 'users', required: true, unique: true },
  hostName: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
 },
  { timestamps: true },
);


const LiveModel = model<LiveModelType>('live', liveSchema);


export default LiveModel;
    
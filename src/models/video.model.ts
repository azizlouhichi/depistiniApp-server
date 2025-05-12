/*
    * Developer: Mohamed Aziz Louhichi
    * Company: None
    * Date: 02/04/2025
    */ 
 

    
import { Schema, model, Types, Document } from 'mongoose';
import {  VideoModelType } from '../types';





export const videoSchema = new Schema<VideoModelType>(
 {
  title: {
    type: String,
    required: [true, 'Please add a title']
  },
  videoUrl: {
    type: String,
    required: true
  }
 },
  { timestamps: true },
);


const VideoModel = model<VideoModelType>('video', videoSchema);


export default VideoModel;
    
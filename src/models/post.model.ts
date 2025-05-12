/*
    * Developer: Mohamed Aziz Louhichi
    * Company: None
    * Date: 08/04/2025
    */



import { Schema, model } from 'mongoose';
import { PostModelType } from '../types';


const commentSchema = new Schema({
  userId: {
    type: String,
    ref: 'users',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
}, { timestamps: true });


export const postSchema = new Schema<PostModelType>(
  {
    userId: {
      type: String,
      ref: 'users',
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    comments: [commentSchema],
  },
  { timestamps: true },
);


const PostModel = model<PostModelType>('post', postSchema);


export default PostModel;

/*
    * Developer: Mohamed Aziz Louhichi
    * Company: None
    * Date: 28/03/2025
    */ 
 

    
import { Schema, model, Types, Document } from 'mongoose';
import {  ChatModelType } from '../types';





export const chatSchema = new Schema<ChatModelType>(
 {
  sender: { type: String, ref: 'users' },
  receiver: { type: String, ref: 'users' },
  message: { type: String, required: true },
  status: { 
    type: String, 
    enum: ["sent", "delivered", "read"], 
    default: "sent" 
  },
 },
  { timestamps: true },
);


const ChatModel = model<ChatModelType>('chat', chatSchema);


export default ChatModel;
    
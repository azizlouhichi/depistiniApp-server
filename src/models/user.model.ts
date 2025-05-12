/*
    * Developer: Mohamed Aziz Louhichi
    * Company: None
    * Date: 08/02/2025
    */ 
 

    
import { Schema, model, Types, Document } from 'mongoose';
import {  UserModelType } from '../types';





export const userSchema = new Schema<UserModelType>(
 {
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, enum: ['Utilisateur', 'Infirmier', 'Médecin', 'Sage-femme', 'Autre'], required: true },
  password: { type: String, required: true },
  userName: { type: String, required: true },
 },
  { timestamps: true },
);


const UserModel = model<UserModelType>('user', userSchema);


export default UserModel;
    
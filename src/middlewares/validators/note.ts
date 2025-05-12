/*
    * Developer: Mohamed Aziz Louhichi
    * Company: None
    * Date: 11/04/2025
    */
   
    import { Expose, Transform } from 'class-transformer';
    import {IsDefined,IsMongoId} from 'class-validator';

    export class NoteIdValidator {
    @IsDefined()
    @Expose()
    @IsMongoId() 
    _id:string

    @IsDefined()
    @Expose()
    userId:string

    @IsDefined()
    @Expose()
    content:string

    @IsDefined()
    @Expose()
    date:string
    }

    
    
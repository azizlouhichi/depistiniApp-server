/*
    * Developer: Mohamed Aziz Louhichi
    * Company: None
    * Date: 08/04/2025
    */
   
    import { Expose } from 'class-transformer';
    import {IsDefined,IsMongoId} from 'class-validator';

    export class PostIdValidator {
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
    comments?:CommentValidator[]
    }

    export class CommentValidator {
    @IsDefined()
    @Expose()
    @IsMongoId()
    userId:string

    @IsDefined()
    @Expose()
    content:string
    }

    
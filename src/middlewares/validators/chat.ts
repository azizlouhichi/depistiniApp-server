/*
    * Developer: Mohamed Aziz Louhichi
    * Company: None
    * Date: 28/03/2025
    */
   
    import { Expose, Transform } from 'class-transformer';
    import {IsDefined,IsMongoId} from 'class-validator';

    export class ChatIdValidator {
    @IsDefined()
    @Expose()
    @IsMongoId() 
    _id:string

    @IsDefined()
    @Expose()
    @IsMongoId()
    sender:string

    @IsDefined()
    @Expose()
    @IsMongoId()
    receiver:string

    @IsDefined()
    @Expose()
    message:string

    @IsDefined()
    @Expose()
    @Transform(({ value }) => value || 'sent')
    status: 'sent' | 'delivered' | 'read'
    }

    
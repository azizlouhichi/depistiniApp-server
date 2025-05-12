/*
    * Developer: Mohamed Aziz Louhichi
    * Company: None
    * Date: 02/04/2025
    */
   
    import { Expose, Transform } from 'class-transformer';
    import {IsDefined,IsMongoId} from 'class-validator';

    export class VideoIdValidator {
    @IsDefined()
    @Expose()
    @IsMongoId() 
    _id:string;

    @IsDefined()
    @Expose()
    @Transform(({ value }) => value.trim())
    title: string;
    @IsDefined()
    @Expose()
    @Transform(({ value }) => value.trim())
    videoUrl: string;
    
    }

    
/*
    * Developer: Mohamed Aziz Louhichi
    * Company: None
    * Date: 03/03/2025
    */
   
    import { Expose, Transform } from 'class-transformer';
    import {IsDefined,IsMongoId, IsNumber, IsOptional, IsString} from 'class-validator';

    export class LiveIdValidator {
    @IsDefined()
    @Expose()
    @IsMongoId() 
    _id:string;

    @IsDefined()
    @Expose()
    @IsString()
    liveID:string;

    @IsDefined()
    @Expose()
    @IsString()
    hostName:string;

    }

    
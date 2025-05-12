/*
    * Developer: Mohamed Aziz Louhichi
    * Company: None
    * Date: 08/02/2025
    */
   
    import { Expose, Transform } from 'class-transformer';
    import {IsDefined,IsMongoId, IsNumber, IsOptional, IsString} from 'class-validator';

    export class UserIdValidator {
    @IsDefined()
    @Expose()
    @IsMongoId() 
    _id:string
    }

    export class QueryValidator {
    @IsOptional()
    @Expose()
    @Transform((obj) => {
      const limit = parseInt(obj.value) || 10;
      return Math.min(limit, 100);
    })
    @IsNumber()
    limit: number;

    @IsOptional()
    @Expose()
    @Transform((obj) => parseInt(obj.value) || 1)
    @IsNumber()
    page: number;

    @IsOptional()
    @Expose()
    @IsString()
    search?: string;
}
    
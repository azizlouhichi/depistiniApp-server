import { Expose } from 'class-transformer';
import { IsDefined, IsEmail, IsNotEmpty, IsString, MinLength, Matches } from 'class-validator';

export class SigninValidator {
  @IsDefined({ message: 'Email is required' })
  @IsString({ message: 'Email must be a string' })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email' })
  @Expose()
  email: string;

  @IsDefined({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
    message: 'Password must include uppercase, lowercase,and number',
  })
  @Expose()
  password: string;
}
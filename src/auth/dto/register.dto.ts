import { IsEmail, IsPhoneNumber, IsString, IsStrongPassword, MinLength, minLength } from "class-validator";

export class RegisterDto {
    ClientId: string;
    @IsString()
    FirstName: string;
    @IsString()
    LastName: string;
    @IsEmail()
    Email: string;
    @IsString()
    PhoneNumber: string;
    @IsString()
    @MinLength(6)
    Password: string;
    @IsString()
    ProfileImageFile: string;
}

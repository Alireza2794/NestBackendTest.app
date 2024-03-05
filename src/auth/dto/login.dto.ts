import { IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class LoginDto {
    @IsString()
    PhoneNumber: string;
    @IsNotEmpty()
    Password: string;
    @IsOptional()
    Code: number; 
}

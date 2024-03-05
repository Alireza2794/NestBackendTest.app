import { ApiProperty } from "@nestjs/swagger";

export interface UserModel {
    ClientId: string;
    FirstName: string;
    LastName: string;
    Email: string;
    PhoneNumber: string;
    Password: string;
    ProfileImageFile: string;
}

export class UserModelResponse {
    @ApiProperty({ example: "string" })
    ClientId: string;
    @ApiProperty({ example: "string" })
    FirstName: string;
    @ApiProperty({ example: "string" })
    LastName: string;
    @ApiProperty({ example: "string" })
    Email: string;
    @ApiProperty({ example: "string" })
    PhoneNumber: string;
    @ApiProperty({ example: "string" })
    Password: string;
    @ApiProperty({ example: "string" })
    ProfileImageFile: string;
}

export class UserModelBody {
    @ApiProperty({ example: "string" })
    FirstName: string;
    @ApiProperty({ example: "string" })
    LastName: string;
    @ApiProperty({ example: "string" })
    Email: string;
    @ApiProperty({ example: "string" })
    PhoneNumber: string;
    @ApiProperty({ example: "string" })
    Password: string;
    @ApiProperty({ example: "string" })
    ProfileImageFile: string;
}
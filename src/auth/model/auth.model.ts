import { ApiProperty } from "@nestjs/swagger";

export class LoginModelBody {
    @ApiProperty({ example: "string" })
    PhoneNumber: string;
    @ApiProperty({ example: "string" })
    Password: string;
}

export class LoginModelResponse {
    @ApiProperty({ example: "string" })
    Code: number;
}
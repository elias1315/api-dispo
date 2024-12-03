import { ApiProperty } from "@nestjs/swagger"

export class loginAuthDto{
    @ApiProperty({ description: 'User', example: 'John Doe' })
    user:string;
    @ApiProperty({ description: 'PAss', example: 'jdoe123' })
    pass:string;
} 
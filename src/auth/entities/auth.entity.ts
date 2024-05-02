import { ApiProperty } from "@nestjs/swagger";

export class Auth {
    @ApiProperty({
        example: 'example@gmail.com',
        required: true
    })
    email: string;

    @ApiProperty({
        required: true
    })
    password: string;
}

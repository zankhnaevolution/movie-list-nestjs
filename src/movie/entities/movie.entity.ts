import { ApiProperty } from "@nestjs/swagger"

export class Movie {
    @ApiProperty({
        example: 'movie',
        required: true
    })
    title: string

    @ApiProperty({
        required: true,
    })
    img: string

    @ApiProperty({
        example: 1999,
        required: true
    })
    published_year: number

    @ApiProperty({
        required: true
    })
    user_id: string
}

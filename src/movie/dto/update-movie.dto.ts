import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {
    @ApiProperty({
        example: 'movie',
        required: false
    })
    title?: string;

    @ApiProperty({
        required: false
    })
    img?: string;

    @ApiProperty({
        example: 1999,
        required: false
    })
    published_year?: number;
}

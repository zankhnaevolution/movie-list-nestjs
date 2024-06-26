/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie, MovieDocument } from '../schema/movie.schema';
import { Model } from 'mongoose';
export declare class MovieService {
    private MovieModel;
    constructor(MovieModel: Model<Movie>);
    private movieProjection;
    create(createMovieDto: CreateMovieDto): Promise<any>;
    findAll(findMovieDto: any): Promise<{
        movies: MovieDocument[];
        totalMovies: number;
    }>;
    findOne(id: string, user_id: string): Promise<any>;
    update(id: string, user_id: string, updateMovieDto: UpdateMovieDto): Promise<any>;
    remove(id: string, user_id: string): Promise<any>;
}

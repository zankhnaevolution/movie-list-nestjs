import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Movie, MovieDocument } from 'src/schema/movie.schema';
import { Model } from 'mongoose';
import * as fs from 'fs';

@Injectable()
export class MovieService {

  constructor(
    @InjectModel(Movie.name) private MovieModel: Model <Movie>
  ){}

  private movieProjection = {
    _id: 1,
    movie_title: 1,
    movie_img: 1,
    movie_published_year: 1,
  };

  async create(createMovieDto: CreateMovieDto): Promise <any> {
    const movie = await this.MovieModel.create({
      movie_title: createMovieDto.title,
      movie_published_year: createMovieDto.published_year,
      movie_img: createMovieDto.img,
      user: createMovieDto.user_id   
    });

    const movieReturn = await this.MovieModel.findById(
      movie._id, 
      this.movieProjection
    );

    return movieReturn;
  }

  async findAll(findMovieDto: any): Promise <MovieDocument[]> {
    console.log(findMovieDto)
    const movies = await this.MovieModel
      .find(
        {
          user: findMovieDto.user_id
        },
        this.movieProjection
      )
      .limit(findMovieDto.num)
      .skip((findMovieDto.page-1) * findMovieDto.num)
      .populate('user', "email -_id");
    return movies;
  }

  async findOne(id: string, user_id: string): Promise <any> {
    try{
      const movie = await this.MovieModel
        .findOne(
          {
            _id: id,
            user: user_id
          },
          this.movieProjection
        );
        return movie;
    }catch(error){
      throw new NotFoundException();
    }
  }

  async update(id: string, user_id: string, updateMovieDto: UpdateMovieDto): Promise <any> {
    try{
      const movie = await this.MovieModel.findOne({
        _id: id,
        user: user_id
      });

      if(updateMovieDto.img){
        fs.unlink(`./uploads/${movie.movie_img}`, (error) => {
          if(error){
            console.log(error)
          }
        });
      }

      const movieUpdate = await this.MovieModel
        .findOneAndUpdate(
          {
            _id: id,
            user: user_id
          },
          {
            movie_title: updateMovieDto.title,
            movie_img: updateMovieDto.img,
            movie_published_year: updateMovieDto.published_year
          },
          {
            projection: this.movieProjection,
            new: true,
            includeResultMetadata: true
          }
        );

      if(movieUpdate.lastErrorObject?.updatedExisting){
        return movieUpdate.value;
      }else{
        throw new NotFoundException();
      }
    }catch(error){
      throw new NotFoundException();
    }
  }

  async remove(id: string, user_id: string): Promise <any> {
    const movie = await this.MovieModel
      .findOneAndDelete(
        {
          _id: id,
          user: user_id
        }, {
          projection: this.movieProjection,
          includeResultMetadata: true
        });
    
    if(movie.value === null){
      throw new NotFoundException();
    }
    return movie.value;
  }
}

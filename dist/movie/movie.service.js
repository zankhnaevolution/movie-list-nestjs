"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const movie_schema_1 = require("../schema/movie.schema");
const mongoose_2 = require("mongoose");
const fs = require("fs");
let MovieService = class MovieService {
    constructor(MovieModel) {
        this.MovieModel = MovieModel;
        this.movieProjection = {
            _id: 1,
            movie_title: 1,
            movie_img: 1,
            movie_published_year: 1,
        };
    }
    async create(createMovieDto) {
        const movie = await this.MovieModel.create({
            movie_title: createMovieDto.title,
            movie_published_year: createMovieDto.published_year,
            movie_img: createMovieDto.img,
            user: createMovieDto.user_id
        });
        const movieReturn = await this.MovieModel.findById(movie._id, this.movieProjection);
        return movieReturn;
    }
    async findAll(findMovieDto) {
        const movies = await this.MovieModel
            .find({
            user: findMovieDto.user_id
        }, this.movieProjection)
            .limit(findMovieDto.num)
            .skip((findMovieDto.page - 1) * findMovieDto.num)
            .populate('user', "email -_id");
        const movieCount = await this.MovieModel
            .find({
            user: findMovieDto.user_id
        }).countDocuments();
        return { movies, totalMovies: movieCount };
    }
    async findOne(id, user_id) {
        try {
            const movie = await this.MovieModel
                .findOne({
                _id: id,
                user: user_id
            }, this.movieProjection);
            return movie;
        }
        catch (error) {
            throw new common_1.NotFoundException();
        }
    }
    async update(id, user_id, updateMovieDto) {
        try {
            const movie = await this.MovieModel.findOne({
                _id: id,
                user: user_id
            });
            if (updateMovieDto.img) {
                fs.unlink(`./uploads/${movie.movie_img}`, (error) => {
                    if (error) {
                        console.log(error);
                    }
                });
            }
            const movieUpdate = await this.MovieModel
                .findOneAndUpdate({
                _id: id,
                user: user_id
            }, {
                movie_title: updateMovieDto.title,
                movie_img: updateMovieDto.img,
                movie_published_year: updateMovieDto.published_year
            }, {
                projection: this.movieProjection,
                new: true,
                includeResultMetadata: true
            });
            if (movieUpdate.lastErrorObject?.updatedExisting) {
                return movieUpdate.value;
            }
            else {
                throw new common_1.NotFoundException();
            }
        }
        catch (error) {
            throw new common_1.NotFoundException();
        }
    }
    async remove(id, user_id) {
        const movie = await this.MovieModel
            .findOneAndDelete({
            _id: id,
            user: user_id
        }, {
            projection: this.movieProjection,
            includeResultMetadata: true
        });
        if (movie.value === null) {
            throw new common_1.NotFoundException();
        }
        return movie.value;
    }
};
exports.MovieService = MovieService;
exports.MovieService = MovieService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(movie_schema_1.Movie.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MovieService);
//# sourceMappingURL=movie.service.js.map
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
exports.MovieController = void 0;
const common_1 = require("@nestjs/common");
const movie_service_1 = require("./movie.service");
const create_movie_dto_1 = require("./dto/create-movie.dto");
const update_movie_dto_1 = require("./dto/update-movie.dto");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const auth_guard_1 = require("../../src/auth/auth.guard");
const swagger_1 = require("@nestjs/swagger");
const storage = (0, multer_1.diskStorage)({
    destination: './uploads/',
    filename: (req, file, cb) => {
        const name = file.originalname.split(".")[0];
        const time = Date.now();
        const extenstion = (0, path_1.extname)(file.originalname);
        cb(null, `${name}_${time}${extenstion}`);
    }
});
let MovieController = class MovieController {
    constructor(movieService) {
        this.movieService = movieService;
    }
    create(req, file, createMovieDto) {
        return this.movieService.create({ ...createMovieDto, img: file.filename, user_id: req.user.id });
    }
    findAll(page = 1, num = 8, req) {
        return this.movieService.findAll({ page, num, user_id: req.user.id });
    }
    findOne(req, id) {
        return this.movieService.findOne(id, req.user.id);
    }
    update(req, id, file, updateMovieDto) {
        return this.movieService.update(id, req.user.id, { ...updateMovieDto, img: file?.filename });
    }
    remove(req, id) {
        return this.movieService.remove(id, req.user.id);
    }
};
exports.MovieController = MovieController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Movie is created successfully'
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('img', {
        storage
    })),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.FileTypeValidator({ fileType: /(png|jpeg|jpg)$/ })
        ]
    }))),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, create_movie_dto_1.CreateMovieDto]),
    __metadata("design:returntype", void 0)
], MovieController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns a list with all movies'
    }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('num')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", void 0)
], MovieController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Movie record fetched successfully'
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Movie record not found'
    }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], MovieController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Movie record updated successfully'
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Movie record not found'
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('img', {
        storage
    })),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.FileTypeValidator({ fileType: /(png|jpeg|jpg)$/ })
        ],
        fileIsRequired: false
    }))),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object, update_movie_dto_1.UpdateMovieDto]),
    __metadata("design:returntype", void 0)
], MovieController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Movie record deleted successfully'
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Movie record not found'
    }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], MovieController.prototype, "remove", null);
exports.MovieController = MovieController = __decorate([
    (0, swagger_1.ApiTags)('Movie'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('movie'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [movie_service_1.MovieService])
], MovieController);
//# sourceMappingURL=movie.controller.js.map
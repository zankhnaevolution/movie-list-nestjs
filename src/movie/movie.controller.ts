import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipe, FileTypeValidator, UseGuards, Request, Query, HttpCode } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';

const storage = diskStorage({
  destination: '/tmp/',
  filename: (req, file, cb) => {
    const name = file.originalname.split(".")[0];
    const time = Date.now();
    const extenstion = extname(file.originalname)
    cb(null, `${name}_${time}${extenstion}`);
  }
})

@ApiTags('Movie')
// @ApiHeader({
//   name: 'Authorization',
//   description: "Provide user's Bearer token",
//   required: true
// })
@ApiBearerAuth()
@Controller('movie')
@UseGuards(AuthGuard)
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 200,
    description: 'Movie is created successfully'
  })
  @UseInterceptors(FileInterceptor('img', {
    storage    
  }))
  create(
    @Request() req,
    @UploadedFile(
      new ParseFilePipe({
        validators:[
          new FileTypeValidator({ fileType: /(png|jpeg|jpg)$/ })
        ]
      })
    ) file: Express.Multer.File, 
    @Body() createMovieDto: CreateMovieDto,
  ) {
      return this.movieService.create({ ...createMovieDto, img: file.filename, user_id: req.user.id })
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Returns a list with all movies'
  })
  findAll(
    @Query('page') page: number = 1,
    @Query('num') num: number = 8,
    @Request() req
  ) {
    return this.movieService.findAll({ page, num, user_id: req.user.id });
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Movie record fetched successfully'
  })
  @ApiResponse({
    status: 404,
    description: 'Movie record not found'
  })
  findOne(
    @Request() req,
    @Param('id') id: string
  ) {
    return this.movieService.findOne(id, req.user.id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Movie record updated successfully'
  })
  @ApiResponse({
    status: 404,
    description: 'Movie record not found'
  })
  @UseInterceptors(FileInterceptor('img',{
    storage
  }))
  update(
    @Request() req,
    @Param('id') id: string, 
    @UploadedFile(
      new ParseFilePipe({
        validators:[
          new FileTypeValidator({ fileType: /(png|jpeg|jpg)$/ })
        ],
        fileIsRequired: false
      })
    ) file: Express.Multer.File,
    @Body() updateMovieDto: UpdateMovieDto
  ) {
    return this.movieService.update(id, req.user.id, { ...updateMovieDto, img: file?.filename });
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Movie record deleted successfully'
  })
  @ApiResponse({
    status: 404,
    description: 'Movie record not found'
  })
  remove(
    @Request() req,
    @Param('id') id: string
  ) {
    return this.movieService.remove(id, req.user.id);
  }
}

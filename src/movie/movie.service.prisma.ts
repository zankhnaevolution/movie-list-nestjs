// import { Injectable } from '@nestjs/common';
// import { CreateMovieDto } from './dto/create-movie.dto';
// import { UpdateMovieDto } from './dto/update-movie.dto';
// import { PrismaService } from 'src/prisma/prisma.service';

// @Injectable()
// export class MovieService {

//   constructor(private prisma: PrismaService) {}

//   create(createMovieDto: CreateMovieDto) {

//     this.prisma.movie.create({
//       data: {
//         movie_title: "demo"
//         user: {
//           connectOrCreate:{
//             where:{
//               id: 1
//             },
//             create:{
              
//             }
//           }
//         }
//       }
//     })

//     return 'This action adds a new movie';
//   }

//   findAll() {
//     return `This action returns all movie`;
//   }

//   findOne(id: number) {
//     return `This action returns a #${id} movie`;
//   }

//   update(id: number, updateMovieDto: UpdateMovieDto) {
//     return `This action updates a #${id} movie`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} movie`;
//   }
// }

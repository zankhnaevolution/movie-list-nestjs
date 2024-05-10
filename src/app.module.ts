import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { AppService } from './app.service';
// import { AppController } from './app.controller';
// import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { MovieModule } from './movie/movie.module';
import { jwtConstants } from './auth/constants';
// import { CheckAuthMiddleware } from './check-auth/check-auth.middleware';
import { MovieController } from './movie/movie.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    MovieModule,
    MongooseModule.forRoot(process.env.MONGODB_URL),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '20s'
      }
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '/uploads/')
    })
  ],
  controllers: [],
  providers: [AppService, /* PrismaService */],
})

export class AppModule {
}
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//     .apply(CheckAuthMiddleware)
//     .forRoutes(MovieController)
//   }
// }

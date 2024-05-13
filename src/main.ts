import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors()
  
  app.use(cookieParser())

  // app.enableCors({
  //   allowedHeaders: ['content-type'],
  //   origin: 'https://movie-list-next-js.vercel.app/',
  //   credentials: true,
  // }); 

  // app.enableCors({
    // allowedHeaders: ['content-type'],
    // origin: true,
    // credentials: true,
  // }); 

  // app.enableCors({
  //   origin: [
  //     /^(.*)/,
  //   ],
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //   preflightContinue: false,
  //   optionsSuccessStatus: 200,
  //   credentials: true,
  //   allowedHeaders:
  //     'Origin,X-Requested-With,Content-Type,Accept,Authorization,authorization,X-Forwarded-for',
  // })

  app.useStaticAssets(join(__dirname, "../", "tmp"), {
    index: false,
    prefix: "/tmp",
  });
  // app.useStaticAssets(join(__dirname, "../", "uploads"), {
  //   index: false,
  //   prefix: "/uploads",
  // })

  const config = new DocumentBuilder()
    .addBearerAuth()
    .addCookieAuth('refresh_token')
    .setTitle('Movie List')
    .setDescription('Simple project for CRUD operation for Movies')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document)

  const port = process.env.PORT || 3000;

  await app.listen(port);
}
bootstrap();

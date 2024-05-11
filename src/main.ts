import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true
  });
  
  app.use(cookieParser())

  app.enableCors({
    origin: [
      "https://movie-list-next-js.vercel.app/"
    ],
  });

  app.useStaticAssets(join(__dirname, "../", "uploads"), {
    index: false,
    prefix: "/uploads",
  })

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

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const path_1 = require("path");
const cookieParser = require("cookie-parser");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(cookieParser());
    app.enableCors({
        origin: 'https://movie-list-next-js.vercel.app/',
    });
    app.useStaticAssets((0, path_1.join)(__dirname, "../", "uploads"), {
        index: false,
        prefix: "/uploads",
    });
    const config = new swagger_1.DocumentBuilder()
        .addBearerAuth()
        .addCookieAuth('refresh_token')
        .setTitle('Movie List')
        .setDescription('Simple project for CRUD operation for Movies')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    const port = process.env.PORT || 3000;
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app/app.module");
const swagger_1 = require("@nestjs/swagger");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 8081;
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        cors: {
            origin: ['http://localhost:3000', process.env.USER_URL], credentials: true
        }
    });
    console.log(`we are listen port ${PORT}`);
    app.use(cookieParser());
    app.setGlobalPrefix('v1');
    const config = new swagger_1.DocumentBuilder()
        .setTitle('anti social social punks club')
        .setDescription('this application servs a lot of buisenes guys who want look my job, and who want use or comunicate with my API')
        .setVersion('1.0.0').addTag('PinkPunk')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('/v1/docs', app, document);
    await app.listen(PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map
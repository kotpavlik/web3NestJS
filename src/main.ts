import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

const PORT = process.env.PORT || 8081;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin:
        ['http://localhost:3000', process.env.USER_URL], credentials: true
    }
  });
  console.log(`we are listen port ${PORT}`);

  app.use(cookieParser());

  app.setGlobalPrefix('v1');
  const config = new DocumentBuilder()
    .setTitle('anti social social punks club')
    .setDescription('this application servs a lot of buisenes guys who want look my job, and who want use or comunicate with my API')
    .setVersion('1.0.0').addTag('PinkPunk')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/v1/docs', app, document)
  await app.listen(PORT);
}
bootstrap();


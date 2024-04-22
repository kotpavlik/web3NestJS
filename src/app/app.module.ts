import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { CoinsModule } from 'src/coins/coins.module';
import { Sessions, SessionsSchema } from 'src/sessions/session.model';
import { User, UserSchema } from './user.model';
import { HashpasswordService } from 'src/features/hashpassword/hashpassword.service';
import { SessionsModule } from 'src/sessions/sessions.module';
import { SessionsService } from 'src/sessions/sessions.service';
import { JWToken } from 'src/features/jwt/jwt.token';
import { MailService } from 'src/mailActivation/mail.service';
import { AuthMiddlewares } from 'src/features/middlewares/auth.middleware';



dotenv.config();

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_DB_URI),
  MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  MongooseModule.forFeature([{ name: Sessions.name, schema: SessionsSchema }]),
    SessionsModule, CoinsModule],
  controllers: [AppController],
  providers: [AppService, HashpasswordService, SessionsService, JWToken, MailService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddlewares)
      .forRoutes('coins');
  }
};
import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionsController } from './sessions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/app/user.model';
import { Sessions, SessionsSchema } from './session.model';
import { GoogleStrategy } from 'src/google.strategy';
import { ConfigModule } from '@nestjs/config';
import { JWToken } from 'src/features/jwt/jwt.token';






@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  MongooseModule.forFeature([{ name: Sessions.name, schema: SessionsSchema }])],
  controllers: [SessionsController],
  providers: [SessionsService, GoogleStrategy, JWToken],

})
export class SessionsModule { }


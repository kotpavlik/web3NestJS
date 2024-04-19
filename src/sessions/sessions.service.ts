import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Sessions } from './session.model';
import mongoose, { Model } from 'mongoose';
import { User } from 'src/app/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { JWToken } from 'src/features/jwt/jwt.token'







@Injectable()
export class SessionsService {

    constructor(
        private readonly JWToken: JWToken,
        @InjectModel(User.name) private UserModel: Model<User>,
        @InjectModel(Sessions.name) private SessionsModel: Model<Sessions>,
    ) { }



    async saveToken(user_id: mongoose.Types.ObjectId, refreshToken: string) {
        try {

            const tokenData = await this.SessionsModel.findOne({
                user_id
            });
            if (tokenData) {
                tokenData.refreshToken = refreshToken;
                return tokenData.save()
            }

            const token = await this.SessionsModel.create({ user_id, refreshToken })
            return token
        } catch (e) {
            console.log(e);
        }

    }





}

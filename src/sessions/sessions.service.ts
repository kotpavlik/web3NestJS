import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Sessions } from './session.model';
import mongoose, { Model } from 'mongoose';
import { User } from 'src/app/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { JWToken } from 'src/features/jwt/jwt.token';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config()






@Injectable()
export class SessionsService {

    constructor(
        private readonly JWToken: JWToken,
        @InjectModel(User.name) private UserModel: Model<User>,
        @InjectModel(Sessions.name) private SessionsModel: Model<Sessions>,
    ) { }


    validateAccessToken(token: string) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            return userData;
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token: string) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
            return userData as any;
        } catch (e) {
            return null;
        }
    }

    async findToken(refreshToken: string) {
        const findTokenData = await this.SessionsModel.findOne({ refreshToken })
        return findTokenData
    }


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

    async removeToken(refreshToken: string) {
        try {
            const find_session = await this.SessionsModel.findOne({ refreshToken })
            const remove_session = await this.SessionsModel.findByIdAndDelete({ _id: find_session._id })
            return remove_session
        } catch (e) {
            console.log(e)
        }
    }





}

import { Sessions } from './session.model';
import mongoose, { Model } from 'mongoose';
import { User } from 'src/app/user.model';
import { JWToken } from 'src/features/jwt/jwt.token';
import * as jwt from 'jsonwebtoken';
export declare class SessionsService {
    private readonly JWToken;
    private UserModel;
    private SessionsModel;
    constructor(JWToken: JWToken, UserModel: Model<User>, SessionsModel: Model<Sessions>);
    validateAccessToken(token: string): string | jwt.JwtPayload;
    validateRefreshToken(token: string): any;
    findToken(refreshToken: string): Promise<mongoose.Document<unknown, {}, Sessions> & Sessions & {
        _id: mongoose.Types.ObjectId;
    }>;
    saveToken(user_id: mongoose.Types.ObjectId, refreshToken: string): Promise<mongoose.Document<unknown, {}, Sessions> & Sessions & {
        _id: mongoose.Types.ObjectId;
    }>;
    removeToken(refreshToken: string): Promise<mongoose.Document<unknown, {}, Sessions> & Sessions & {
        _id: mongoose.Types.ObjectId;
    }>;
}

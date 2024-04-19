import { Sessions } from './session.model';
import mongoose, { Model } from 'mongoose';
import { User } from 'src/app/user.model';
import { JWToken } from 'src/features/jwt/jwt.token';
export declare class SessionsService {
    private readonly JWToken;
    private UserModel;
    private SessionsModel;
    constructor(JWToken: JWToken, UserModel: Model<User>, SessionsModel: Model<Sessions>);
    saveToken(user_id: mongoose.Types.ObjectId, refreshToken: string): Promise<mongoose.Document<unknown, {}, Sessions> & Sessions & {
        _id: mongoose.Types.ObjectId;
    }>;
}

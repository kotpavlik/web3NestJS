import { Sessions } from './session.model';
import mongoose, { Model } from 'mongoose';
export declare class SessionsService {
    private SessionsModel;
    constructor(SessionsModel: Model<Sessions>);
    validateAccessToken(token: string): any;
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

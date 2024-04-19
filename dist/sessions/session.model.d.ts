import mongoose, { Document } from "mongoose";
export declare class Sessions {
    user_id: mongoose.Schema.Types.ObjectId;
    refreshToken: string;
}
export type SessionsSchemaType = Sessions & Document;
export declare const SessionsSchema: mongoose.Schema<Sessions, mongoose.Model<Sessions, any, any, any, mongoose.Document<unknown, any, Sessions> & Sessions & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Sessions, mongoose.Document<unknown, {}, mongoose.FlatRecord<Sessions>> & mongoose.FlatRecord<Sessions> & {
    _id: mongoose.Types.ObjectId;
}>;

import { Types } from "mongoose";
export type SessionsType = {
    user_id: Types.ObjectId;
    _id: Types.ObjectId;
    refreshToken: string;
};

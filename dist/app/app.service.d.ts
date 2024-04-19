/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { UserSchemaType } from './user.model';
import { UserLoginDto, UserSignUpDto } from '../app/user.dto';
import { HashpasswordService } from 'src/features/hashpassword/hashpassword.service';
import { User } from '../app/user.model';
import { Model } from 'mongoose';
import { ResponseType } from './types/respType';
import { Sessions, SessionsSchemaType } from 'src/sessions/session.model';
import { SessionsService } from 'src/sessions/sessions.service';
import { JWToken } from 'src/features/jwt/jwt.token';
import { MailService } from 'src/mailActivation/mail.service';
export declare class AppService {
    private readonly HashpasswordService;
    private readonly MailService;
    private readonly JWToken;
    private readonly sessionsService;
    private UserModel;
    private SessionsModel;
    constructor(HashpasswordService: HashpasswordService, MailService: MailService, JWToken: JWToken, sessionsService: SessionsService, UserModel: Model<User>, SessionsModel: Model<Sessions>);
    signUp(userDto: UserSignUpDto): Promise<ResponseType<UserSchemaType, SessionsSchemaType>>;
    login(userDto: UserLoginDto): Promise<ResponseType<UserSchemaType, SessionsSchemaType>>;
    activate(activaitionLink: string): Promise<void>;
    logout(sessionID: string): Promise<import("mongoose").Document<unknown, {}, Sessions> & Sessions & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    googleLogin(req: Request & {
        user: any;
    }): Promise<"No user from google" | {
        message: string;
        user: any;
    }>;
}

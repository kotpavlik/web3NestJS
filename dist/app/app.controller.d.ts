import { UserLoginDto, UserSignUpDto } from '../app/user.dto';
import { Response, Request } from 'express';
import { AppService } from './app.service';
import { User } from './user.model';
export declare class AppController {
    private readonly AppService;
    constructor(AppService: AppService);
    SignUp(dto: UserSignUpDto, res: Response): Promise<Response<any, Record<string, any>>>;
    Login(dto: UserLoginDto, res: Response): Promise<Response<any, Record<string, any>>>;
    Logout(res: Response, req: Request & {
        user: User;
    } & {
        sessionID: string;
    }): Promise<void | Response<any, Record<string, any>>>;
    Activate(res: Response, req: Request, link: string): Promise<void>;
    googleAuth(req: any): Promise<void>;
    googleAuthRedirect(req: any): Promise<"No user from google" | {
        message: string;
        user: any;
    }>;
}

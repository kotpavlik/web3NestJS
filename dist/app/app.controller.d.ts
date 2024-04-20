import { SessionsService } from 'src/sessions/sessions.service';
import { UserLoginDto, UserSignUpDto } from '../app/user.dto';
import { Response, Request } from 'express';
import { AppService } from './app.service';
export declare class AppController {
    private readonly AppService;
    private readonly SessionsService;
    constructor(AppService: AppService, SessionsService: SessionsService);
    SignUp(dto: UserSignUpDto, res: Response): Promise<Response<any, Record<string, any>>>;
    Login(dto: UserLoginDto, res: Response): Promise<Response<any, Record<string, any>>>;
    Refresh(res: Response, req: Request): Promise<Response<any, Record<string, any>>>;
    Logout(res: Response, req: Request): Promise<Response<any, Record<string, any>>>;
    Activate(res: Response, req: Request, link: string): Promise<void | Response<any, Record<string, any>>>;
    googleAuth(req: any): Promise<void>;
    googleAuthRedirect(req: any): Promise<"No user from google" | {
        message: string;
        user: any;
    }>;
}

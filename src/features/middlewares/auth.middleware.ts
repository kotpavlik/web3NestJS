
import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { SessionsService } from "src/sessions/sessions.service";



@Injectable()
export class AuthMiddlewares implements NestMiddleware {
    constructor(
        private readonly sessionsService: SessionsService,
    ) { }
    use(req: Request, res: Response, next: NextFunction) {

        try {
            const authorizationHeader = req.headers.authorization;

            if (!authorizationHeader) {
                throw new HttpException('Unautjorized user, login pls 😌', HttpStatus.UNAUTHORIZED)
            }
            const accessToken = authorizationHeader.split(' ')[1];
            if (!accessToken) {
                throw new HttpException('Unautjorized user, login pls 😌', HttpStatus.UNAUTHORIZED)
            }
            const userData = this.sessionsService.validateAccessToken(accessToken);
            if (!userData) {
                throw new HttpException('Unautjorized user, login pls 😌', HttpStatus.UNAUTHORIZED)
            }
            req.user = userData
            next();


        } catch (e) {
            next(e)
        }

    }
}
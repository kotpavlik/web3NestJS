import { NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { SessionsService } from "src/sessions/sessions.service";
export declare class AuthMiddlewares implements NestMiddleware {
    private readonly sessionsService;
    constructor(sessionsService: SessionsService);
    use(req: Request, res: Response, next: NextFunction): void;
}

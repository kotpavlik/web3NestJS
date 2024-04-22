"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddlewares = void 0;
const common_1 = require("@nestjs/common");
const sessions_service_1 = require("../../sessions/sessions.service");
let AuthMiddlewares = class AuthMiddlewares {
    constructor(sessionsService) {
        this.sessionsService = sessionsService;
    }
    use(req, res, next) {
        try {
            const authorizationHeader = req.headers.authorization;
            if (!authorizationHeader) {
                throw new common_1.HttpException('Unautjorized user, login pls 😌', common_1.HttpStatus.UNAUTHORIZED);
            }
            const accessToken = authorizationHeader.split(' ')[1];
            if (!accessToken) {
                throw new common_1.HttpException('Unautjorized user, login pls 😌', common_1.HttpStatus.UNAUTHORIZED);
            }
            const userData = this.sessionsService.validateAccessToken(accessToken);
            if (!userData) {
                throw new common_1.HttpException('Unautjorized user, login pls 😌', common_1.HttpStatus.UNAUTHORIZED);
            }
            req.user = userData;
            next();
        }
        catch (e) {
            next(e);
        }
    }
};
exports.AuthMiddlewares = AuthMiddlewares;
exports.AuthMiddlewares = AuthMiddlewares = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [sessions_service_1.SessionsService])
], AuthMiddlewares);
//# sourceMappingURL=auth.middleware.js.map
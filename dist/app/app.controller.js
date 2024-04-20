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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const sessions_service_1 = require("../sessions/sessions.service");
const session_model_1 = require("./../sessions/session.model");
const common_1 = require("@nestjs/common");
const user_dto_1 = require("../app/user.dto");
const app_service_1 = require("./app.service");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const dotenv = require("dotenv");
dotenv.config();
let AppController = class AppController {
    constructor(AppService, SessionsService) {
        this.AppService = AppService;
        this.SessionsService = SessionsService;
    }
    async SignUp(dto, res) {
        try {
            const session_resp_data = await this.AppService.signUp(dto);
            return res.cookie("refreshToken", session_resp_data.tokens && session_resp_data.tokens.refreshToken, {
                httpOnly: true,
                maxAge: 30 * 24 * 60 * 60 * 1000,
                secure: true
            }).status(201).json(session_resp_data);
        }
        catch (e) {
            if (e instanceof common_1.HttpException) {
                return res.status(e.getStatus()).json({ error: e.getResponse() });
            }
            else {
                return res.status(500).json({ error: e.message });
            }
        }
    }
    async Login(dto, res) {
        try {
            const session_resp_data = await this.AppService.login(dto);
            return res.cookie("refreshToken", session_resp_data.tokens && session_resp_data.tokens.refreshToken, {
                httpOnly: true,
                sameSite: 'none',
                maxAge: 30 * 24 * 60 * 60 * 1000,
                secure: true
            }).status(201).json(session_resp_data);
        }
        catch (e) {
            if (e instanceof common_1.HttpException) {
                return res.status(e.getStatus()).json({ error: e.getResponse() });
            }
            else {
                return res.status(500).json({ error: e });
            }
        }
    }
    async Refresh(res, req) {
        try {
            const { refreshToken } = req.cookies;
            const session_resp_data = await this.AppService.refresh(refreshToken);
            return res.cookie("refreshToken", session_resp_data.tokens && session_resp_data.tokens.refreshToken, {
                httpOnly: true,
                sameSite: 'none',
                maxAge: 30 * 24 * 60 * 60 * 1000,
                secure: true
            }).status(201).json(session_resp_data);
        }
        catch (e) {
            if (e instanceof common_1.HttpException) {
                return res.status(e.getStatus()).json({ error: e.getResponse() });
            }
            else {
                return res.status(500).json({ error: e.message });
            }
        }
    }
    async Logout(res, req) {
        try {
            const { refreshToken } = req.cookies;
            const clear_session = await this.AppService.logout(refreshToken);
            if (clear_session) {
                res.clearCookie("refreshToken").json(clear_session);
            }
        }
        catch (e) {
            if (e instanceof common_1.HttpException) {
                return res.status(e.getStatus()).json({ error: e.getResponse() });
            }
            else {
                return res.status(500).json({ error: e.message });
            }
        }
    }
    async Activate(res, req, link) {
        try {
            await this.AppService.activate(link);
            return res.redirect(process.env.USER_URL);
        }
        catch (e) {
            if (e instanceof common_1.HttpException) {
                return res.status(e.getStatus()).json({ error: e.getResponse() });
            }
            else {
                return res.status(500).json({ error: e.message });
            }
        }
    }
    async googleAuth(req) { }
    googleAuthRedirect(req) {
        console.log(req);
        return this.AppService.googleLogin(req);
    }
};
exports.AppController = AppController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create new user' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: session_model_1.Sessions }),
    (0, common_1.Post)('signup'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserSignUpDto, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "SignUp", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Autorization User' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: session_model_1.Sessions }),
    (0, common_1.Post)('login'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserLoginDto, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "Login", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Refresh token' }),
    (0, common_1.Get)('refresh'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "Refresh", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'User logout' }),
    (0, common_1.Get)('logout'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "Logout", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'activation acctont' }),
    (0, common_1.Get)('activate/:link'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Param)('link')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "Activate", null);
__decorate([
    (0, common_1.Get)('google'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "googleAuth", null);
__decorate([
    (0, common_1.Get)('redirect'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "googleAuthRedirect", null);
exports.AppController = AppController = __decorate([
    (0, swagger_1.ApiTags)('Auth User'),
    (0, common_1.Controller)(''),
    __metadata("design:paramtypes", [app_service_1.AppService, sessions_service_1.SessionsService])
], AppController);
//# sourceMappingURL=app.controller.js.map
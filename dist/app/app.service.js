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
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const hashpassword_service_1 = require("../features/hashpassword/hashpassword.service");
const user_model_1 = require("../app/user.model");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const session_model_1 = require("../sessions/session.model");
const uuid_1 = require("uuid");
const sessions_service_1 = require("../sessions/sessions.service");
const jwt_token_1 = require("../features/jwt/jwt.token");
const mail_service_1 = require("../mailActivation/mail.service");
const dotenv = require("dotenv");
dotenv.config();
let AppService = class AppService {
    constructor(HashpasswordService, MailService, JWToken, sessionsService, UserModel, SessionsModel) {
        this.HashpasswordService = HashpasswordService;
        this.MailService = MailService;
        this.JWToken = JWToken;
        this.sessionsService = sessionsService;
        this.UserModel = UserModel;
        this.SessionsModel = SessionsModel;
    }
    async signUp(userDto) {
        const hashPass = await this.HashpasswordService.hashPassword(userDto.password);
        const activaitionLink = (0, uuid_1.v4)();
        const dataWithHashPass = { ...userDto, password: hashPass, activaitionLink: activaitionLink };
        const allUsers = await this.UserModel.find();
        const filtred_email = allUsers.filter(u => u.email === userDto.email);
        if (filtred_email.length > 0) {
            const email_validate_resp = { message: 'User with this email address already exists' };
            return email_validate_resp;
        }
        const user = await this.UserModel.create(dataWithHashPass);
        await this.MailService.sendActivationMail(user.email, `${process.env.API_URL}/v1/activate/${user.activaitionLink}`);
        const tokens = this.JWToken.generateToken({ email: user.email, isActivated: user.isActivated, id: user._id });
        const session = await this.sessionsService.saveToken(user._id, tokens.refreshToken);
        const session_id = session._id;
        const response_signup = { message: `Welcome ❤️‍🔥 ${user.name} `, user, session_id, tokens };
        return response_signup;
    }
    async login(userDto) {
        const { email } = userDto;
        const [user] = await this.UserModel.find({
            email
        });
        if (!user) {
            throw new common_1.HttpException('Please register 🚀', common_1.HttpStatus.CONFLICT);
        }
        const calcHashPass = await this.HashpasswordService.hashPassword(userDto.password);
        if (!user || user.password !== calcHashPass) {
            throw new common_1.HttpException('incorrect password', common_1.HttpStatus.BAD_REQUEST);
        }
        const tokens = this.JWToken.generateToken({ email: user.email, isActivated: user.isActivated, id: user._id });
        const session = await this.sessionsService.saveToken(user._id, tokens.refreshToken);
        const session_id = session._id;
        const response_login = { message: `Welcome ❤️‍🔥 ${user.name} `, session_id, user, tokens };
        return response_login;
    }
    async activate(activaitionLink) {
        const user = await this.UserModel.findOne({ activaitionLink });
        if (!user) {
            throw new common_1.HttpException('User is not finded ', common_1.HttpStatus.BAD_REQUEST);
        }
        user.isActivated = true;
        await user.save();
    }
    async logout(refreshToken) {
        const deleted_session = await this.sessionsService.removeToken(refreshToken);
        return deleted_session;
    }
    async refresh(refreshToken) {
        if (!refreshToken) {
            throw new common_1.HttpException('Unautjorized user, login pls 😌', common_1.HttpStatus.UNAUTHORIZED);
        }
        const userData = this.sessionsService.validateRefreshToken(refreshToken);
        const tokenfromDB = this.sessionsService.findToken(refreshToken);
        if (!userData || !tokenfromDB) {
            throw new common_1.HttpException('Unautjorized user, login pls 😌', common_1.HttpStatus.UNAUTHORIZED);
        }
        const userId = userData.id;
        const user = await this.UserModel.findById(userId);
        const tokens = this.JWToken.generateToken({ email: user.email, isActivated: user.isActivated, id: user._id });
        const session = await this.sessionsService.saveToken(user._id, tokens.refreshToken);
        const session_id = session._id;
        const response_login = { message: `Welcome ❤️‍🔥 ${user.name} `, session_id, user, tokens };
        return response_login;
    }
    async googleLogin(req) {
        if (!req.user) {
            return 'No user from google';
        }
        return {
            message: 'User information from google',
            user: req.user
        };
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(4, (0, mongoose_2.InjectModel)(user_model_1.User.name)),
    __param(5, (0, mongoose_2.InjectModel)(session_model_1.Sessions.name)),
    __metadata("design:paramtypes", [hashpassword_service_1.HashpasswordService,
        mail_service_1.MailService,
        jwt_token_1.JWToken,
        sessions_service_1.SessionsService,
        mongoose_1.Model, mongoose_1.Model])
], AppService);
//# sourceMappingURL=app.service.js.map
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
exports.SessionsService = void 0;
const common_1 = require("@nestjs/common");
const session_model_1 = require("./session.model");
const mongoose_1 = require("mongoose");
const user_model_1 = require("../app/user.model");
const mongoose_2 = require("@nestjs/mongoose");
const jwt_token_1 = require("../features/jwt/jwt.token");
let SessionsService = class SessionsService {
    constructor(JWToken, UserModel, SessionsModel) {
        this.JWToken = JWToken;
        this.UserModel = UserModel;
        this.SessionsModel = SessionsModel;
    }
    async saveToken(user_id, refreshToken) {
        try {
            const tokenData = await this.SessionsModel.findOne({
                user_id
            });
            if (tokenData) {
                tokenData.refreshToken = refreshToken;
                return tokenData.save();
            }
            const token = await this.SessionsModel.create({ user_id, refreshToken });
            return token;
        }
        catch (e) {
            console.log(e);
        }
    }
};
exports.SessionsService = SessionsService;
exports.SessionsService = SessionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_2.InjectModel)(user_model_1.User.name)),
    __param(2, (0, mongoose_2.InjectModel)(session_model_1.Sessions.name)),
    __metadata("design:paramtypes", [jwt_token_1.JWToken,
        mongoose_1.Model,
        mongoose_1.Model])
], SessionsService);
//# sourceMappingURL=sessions.service.js.map
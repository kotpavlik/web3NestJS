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
const mongoose_2 = require("@nestjs/mongoose");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
let SessionsService = class SessionsService {
    constructor(SessionsModel) {
        this.SessionsModel = SessionsModel;
    }
    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return userData;
        }
        catch (e) {
            return null;
        }
    }
    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData;
        }
        catch (e) {
            return null;
        }
    }
    async findToken(refreshToken) {
        const findTokenData = await this.SessionsModel.findOne({ refreshToken });
        return findTokenData;
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
    async removeToken(refreshToken) {
        try {
            const find_session = await this.SessionsModel.findOne({ refreshToken });
            const remove_session = await this.SessionsModel.findByIdAndDelete({ _id: find_session._id });
            return remove_session;
        }
        catch (e) {
            console.log(e);
        }
    }
};
exports.SessionsService = SessionsService;
exports.SessionsService = SessionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(session_model_1.Sessions.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], SessionsService);
//# sourceMappingURL=sessions.service.js.map
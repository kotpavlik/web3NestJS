"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionsModule = void 0;
const common_1 = require("@nestjs/common");
const sessions_service_1 = require("./sessions.service");
const sessions_controller_1 = require("./sessions.controller");
const mongoose_1 = require("@nestjs/mongoose");
const user_model_1 = require("../app/user.model");
const session_model_1 = require("./session.model");
const google_strategy_1 = require("../google.strategy");
const jwt_token_1 = require("../features/jwt/jwt.token");
let SessionsModule = class SessionsModule {
};
exports.SessionsModule = SessionsModule;
exports.SessionsModule = SessionsModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: user_model_1.User.name, schema: user_model_1.UserSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: session_model_1.Sessions.name, schema: session_model_1.SessionsSchema }])],
        controllers: [sessions_controller_1.SessionsController],
        providers: [sessions_service_1.SessionsService, google_strategy_1.GoogleStrategy, jwt_token_1.JWToken],
    })
], SessionsModule);
//# sourceMappingURL=sessions.module.js.map
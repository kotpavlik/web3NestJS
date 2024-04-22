"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const mongoose_1 = require("@nestjs/mongoose");
const dotenv = require("dotenv");
const coins_module_1 = require("../coins/coins.module");
const session_model_1 = require("../sessions/session.model");
const user_model_1 = require("./user.model");
const hashpassword_service_1 = require("../features/hashpassword/hashpassword.service");
const sessions_module_1 = require("../sessions/sessions.module");
const sessions_service_1 = require("../sessions/sessions.service");
const jwt_token_1 = require("../features/jwt/jwt.token");
const mail_service_1 = require("../mailActivation/mail.service");
const auth_middleware_1 = require("../features/middlewares/auth.middleware");
dotenv.config();
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(auth_middleware_1.AuthMiddlewares)
            .forRoutes('coins');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forRoot(process.env.MONGO_DB_URI),
            mongoose_1.MongooseModule.forFeature([{ name: user_model_1.User.name, schema: user_model_1.UserSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: session_model_1.Sessions.name, schema: session_model_1.SessionsSchema }]),
            sessions_module_1.SessionsModule, coins_module_1.CoinsModule],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, hashpassword_service_1.HashpasswordService, sessions_service_1.SessionsService, jwt_token_1.JWToken, mail_service_1.MailService]
    })
], AppModule);
;
//# sourceMappingURL=app.module.js.map
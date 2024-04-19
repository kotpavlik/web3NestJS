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
exports.UserSchema = exports.User = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const role_enum_1 = require("./types/role.enum");
const swagger_1 = require("@nestjs/swagger");
let User = class User {
};
exports.User = User;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'example@gmail.com', description: 'user email' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Ivan', description: 'user first name' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'pasword123', description: 'user password' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'v34fa-xcvxcd-1223kfu-sa-fds', description: 'for confirm email' }),
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", String)
], User.prototype, "activaitionLink", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'for activated' }),
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isActivated", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '/assets/avatars/445325235522mkmdkf', description: 'user avatar' }),
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", String)
], User.prototype, "avatar", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '445325235522mkmdkf', description: 'user avatar id' }),
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", String)
], User.prototype, "avatarId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'user', description: 'user role', enum: role_enum_1.roleEnum }),
    (0, mongoose_1.Prop)({ enum: Object.values(role_enum_1.roleEnum), default: role_enum_1.roleEnum.basic_user }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
exports.User = User = __decorate([
    (0, mongoose_1.Schema)()
], User);
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
//# sourceMappingURL=user.model.js.map
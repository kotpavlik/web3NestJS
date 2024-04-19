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
exports.UserLoginDto = exports.UserSignUpDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class UserSignUpDto {
}
exports.UserSignUpDto = UserSignUpDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'example@gmail.com', description: 'user email' }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UserSignUpDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'pasword123', description: 'user password' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UserSignUpDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Ivan', description: 'user first name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UserSignUpDto.prototype, "name", void 0);
class UserLoginDto {
}
exports.UserLoginDto = UserLoginDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'example@gmail.com', description: 'user email' }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UserLoginDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'pasword123', description: 'user password' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UserLoginDto.prototype, "password", void 0);
//# sourceMappingURL=user.dto.js.map
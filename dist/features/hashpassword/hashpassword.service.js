"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashpasswordService = void 0;
const common_1 = require("@nestjs/common");
const crypto = require("crypto");
let HashpasswordService = class HashpasswordService {
    async hashPassword(password) {
        const salt = "my_salt";
        return crypto
            .createHash("sha256")
            .update(password + salt)
            .digest("hex");
    }
};
exports.HashpasswordService = HashpasswordService;
exports.HashpasswordService = HashpasswordService = __decorate([
    (0, common_1.Injectable)()
], HashpasswordService);
//# sourceMappingURL=hashpassword.service.js.map
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
exports.CoinsService = void 0;
const common_1 = require("@nestjs/common");
const bybit_api_1 = require("bybit-api");
let CoinsService = class CoinsService {
    async getClientFunc(ApiData) {
        const client = new bybit_api_1.RestClientV5({
            key: ApiData.APIKey,
            secret: ApiData.APISecretKEY,
        });
        this.client = client;
    }
    constructor() { }
    async getWalletBalance() {
        const myBalance = await this.client.getWalletBalance({ accountType: 'UNIFIED' });
        if (Object.keys(myBalance.result).length === 0) {
            throw new common_1.HttpException(' I mean that api key or secret has mistake 😌', common_1.HttpStatus.BAD_REQUEST);
        }
        return myBalance;
    }
};
exports.CoinsService = CoinsService;
exports.CoinsService = CoinsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], CoinsService);
//# sourceMappingURL=coins.service.js.map
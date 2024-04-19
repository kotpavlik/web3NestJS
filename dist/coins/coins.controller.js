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
exports.CoinsController = void 0;
const common_1 = require("@nestjs/common");
const coins_service_1 = require("./coins.service");
const swagger_1 = require("@nestjs/swagger");
const allcoins_dto_1 = require("./allcoins.dto");
let CoinsController = class CoinsController {
    constructor(CoinsService) {
        this.CoinsService = CoinsService;
    }
    async MyBalance(res, req, APIkeys) {
        try {
            await this.CoinsService.getClientFunc(APIkeys);
            const getWalletBalance = await this.CoinsService.getWalletBalance();
            return res.status(201).json({ getWalletBalance });
        }
        catch (e) {
            if (e instanceof common_1.HttpException) {
                return res.status(e.getStatus()).json({ error: e.getResponse(), status: e.getStatus() });
            }
            else {
                return res.status(500).json({ error: e });
            }
        }
    }
};
exports.CoinsController = CoinsController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get ByBit data' }),
    (0, swagger_1.ApiResponse)({ status: 201 }),
    (0, common_1.Get)('mybalance'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, allcoins_dto_1.AllCoinsDTO]),
    __metadata("design:returntype", Promise)
], CoinsController.prototype, "MyBalance", null);
exports.CoinsController = CoinsController = __decorate([
    (0, common_1.Controller)('coins'),
    __metadata("design:paramtypes", [coins_service_1.CoinsService])
], CoinsController);
//# sourceMappingURL=coins.controller.js.map
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RestClientV5 } from 'bybit-api';
import { AllCoinsDTO } from './allcoins.dto';

@Injectable()
export class CoinsService {
    client: RestClientV5

    async getClientFunc(ApiData: AllCoinsDTO) {
        const client = new RestClientV5({
            key: ApiData.APIKey,
            secret: ApiData.APISecretKEY,
        });
        this.client = client
    }
    constructor() { }

    async getWalletBalance() {
        const myBalance = await this.client.getWalletBalance({ accountType: 'UNIFIED' })

        if (Object.keys(myBalance.result).length === 0) {
            throw new HttpException(' I mean that api key or secret has mistake 😌', HttpStatus.BAD_REQUEST)
        }
        return myBalance
    }
}

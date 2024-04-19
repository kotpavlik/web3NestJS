import { RestClientV5 } from 'bybit-api';
import { AllCoinsDTO } from './allcoins.dto';
export declare class CoinsService {
    client: RestClientV5;
    getClientFunc(ApiData: AllCoinsDTO): Promise<void>;
    constructor();
    getWalletBalance(): Promise<import("bybit-api").APIResponseV3WithTime<{
        list: import("bybit-api").WalletBalanceV5[];
    }>>;
}

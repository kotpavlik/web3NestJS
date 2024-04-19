import { CoinsService } from './coins.service';
import { AllCoinsDTO } from './allcoins.dto';
import { Response, Request } from 'express';
export declare class CoinsController {
    private readonly CoinsService;
    constructor(CoinsService: CoinsService);
    MyBalance(res: Response, req: Request, APIkeys: AllCoinsDTO): Promise<Response<any, Record<string, any>>>;
}

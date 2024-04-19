import { Body, Controller, Get, HttpException, Req, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { CoinsService } from './coins.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AllCoinsDTO } from './allcoins.dto';
import { Response, Request } from 'express';


@Controller('coins')
export class CoinsController {

  constructor(private readonly CoinsService: CoinsService) { }

  @ApiOperation({ summary: 'Get ByBit data' })
  @ApiResponse({ status: 201 })
  @Get('mybalance')
  @UsePipes(new ValidationPipe())
  async MyBalance(@Res() res: Response, @Req() req: Request, @Body() APIkeys: AllCoinsDTO) {

    try {
      await this.CoinsService.getClientFunc(APIkeys)
      const getWalletBalance = await this.CoinsService.getWalletBalance()
      return res.status(201).json({ getWalletBalance })
    } catch (e) {
      if (e instanceof HttpException) {
        return res.status(e.getStatus()).json({ error: e.getResponse(), status: e.getStatus() });
      } else {
        return res.status(500).json({ error: e });
      }
    }


  }
}

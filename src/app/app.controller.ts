import { SessionsService } from 'src/sessions/sessions.service';
import { Sessions } from './../sessions/session.model';
import { Body, Controller, Get, HttpException, Post, Req, Res, UsePipes, ValidationPipe, UseGuards, Param } from '@nestjs/common';
import { UserLoginDto, UserSignUpDto } from '../app/user.dto';
import { Response, Request } from 'express';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import * as dotenv from 'dotenv';

dotenv.config()


@ApiTags('Auth User')
@Controller('')
export class AppController {
  constructor(private readonly AppService: AppService, private readonly SessionsService: SessionsService) { }


  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({ status: 201, type: Sessions })
  @Post('signup')
  @UsePipes(new ValidationPipe())
  async SignUp(@Body() dto: UserSignUpDto, @Res() res: Response) {
    try {
      const session_resp_data = await this.AppService.signUp(dto)
      return res.cookie("refreshToken", session_resp_data.tokens && session_resp_data.tokens.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        secure: true
      }).status(201).json(session_resp_data)
    } catch (e) {
      if (e instanceof HttpException) {
        return res.status(e.getStatus()).json({ error: e.getResponse() });
      } else {
        return res.status(500).json({ error: e.message });
      }
    }
  }


  @ApiOperation({ summary: 'Autorization User' })
  @ApiResponse({ status: 200, type: Sessions })
  @Post('login')
  @UsePipes(new ValidationPipe())
  async Login(@Body() dto: UserLoginDto, @Res() res: Response) {
    try {
      const session_resp_data = await this.AppService.login(dto)
      return res.cookie("refreshToken", session_resp_data.tokens && session_resp_data.tokens.refreshToken, {
        httpOnly: true,
        sameSite: 'none',
        maxAge: 30 * 24 * 60 * 60 * 1000,
        secure: true
      }).status(201).json(session_resp_data)
    } catch (e) {
      if (e instanceof HttpException) {
        return res.status(e.getStatus()).json({ error: e.getResponse() });
      } else {
        return res.status(500).json({ error: e });
      }
    }
  }
  @ApiOperation({ summary: 'Refresh token' })
  @Get('refresh')
  async Refresh(@Res() res: Response, @Req() req: Request) {
    try {
      const { refreshToken } = req.cookies;
      const session_resp_data = await this.AppService.refresh(refreshToken)
      return res.cookie("refreshToken", session_resp_data.tokens && session_resp_data.tokens.refreshToken, {
        httpOnly: true,
        sameSite: 'none',
        maxAge: 30 * 24 * 60 * 60 * 1000,
        secure: true
      }).status(201).json(session_resp_data)
    } catch (e) {
      if (e instanceof HttpException) {
        return res.status(e.getStatus()).json({ error: e.getResponse() });
      } else {
        return res.status(500).json({ error: e.message });

      }
    }
  }


  @ApiOperation({ summary: 'User logout' })
  @Get('logout')
  async Logout(@Res() res: Response, @Req() req: Request) {
    try {

      const { refreshToken } = req.cookies;
      const clear_session = await this.AppService.logout(refreshToken)
      if (clear_session) {
        res.clearCookie("refreshToken").json(clear_session);
      }
    } catch (e) {
      if (e instanceof HttpException) {
        return res.status(e.getStatus()).json({ error: e.getResponse() });
      } else {
        return res.status(500).json({ error: e.message });

      }
    }
  }

  @ApiOperation({ summary: 'activation acctont' })
  @Get('activate/:link')
  async Activate(@Res() res: Response, @Req() req: Request, @Param('link') link: string) {
    try {
      await this.AppService.activate(link)
      return res.redirect(process.env.USER_URL)

    } catch (e) {
      if (e instanceof HttpException) {
        return res.status(e.getStatus()).json({ error: e.getResponse() });
      } else {
        return res.status(500).json({ error: e.message });
      }
    }
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) { }

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    console.log(req)
    return this.AppService.googleLogin(req)
  }


}



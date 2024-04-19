import { Sessions } from './../sessions/session.model';
import { Body, Controller, Get, HttpException, Post, Req, Res, UsePipes, ValidationPipe, UseGuards, Param } from '@nestjs/common';
import { UserLoginDto, UserSignUpDto } from '../app/user.dto';
import { Response, Request } from 'express';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './user.model';
import { AuthGuard } from '@nestjs/passport';
import * as dotenv from 'dotenv';

dotenv.config()


@ApiTags('Auth User')
@Controller('')
export class AppController {
  constructor(private readonly AppService: AppService) { }


  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({ status: 201, type: Sessions })
  @Post('signup')
  @UsePipes(new ValidationPipe())
  async SignUp(@Body() dto: UserSignUpDto, @Res() res: Response) {
    try {
      const session_resp_data = await this.AppService.signUp(dto)
      return res.cookie("refreshToken", session_resp_data.session && session_resp_data.session.refreshToken, {
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
      return res.cookie("sessionId", session_resp_data.session && session_resp_data.session._id, {
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


  @ApiOperation({ summary: 'User logout' })
  @Get('logout')
  async Logout(@Res() res: Response, @Req() req: Request & { user: User } & { sessionID: string }) {
    try {

      if (!req.user) {
        return res.redirect("/");
      }

      const clear_session = await this.AppService.logout(req.sessionID)
      if (clear_session) {
        res.clearCookie("sessionId").json(req.user);
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
      console.log(1)
      return res.redirect(process.env.USER_URL)

    } catch (e) {

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



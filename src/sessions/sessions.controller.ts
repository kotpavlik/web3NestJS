import { Body, Controller, Get, HttpException, Req, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { Response, Request } from 'express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Sessions } from './session.model';






@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) { }



}

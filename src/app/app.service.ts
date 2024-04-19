import { UserSchemaType } from './user.model';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserLoginDto, UserSignUpDto } from '../app/user.dto';
import { HashpasswordService } from 'src/features/hashpassword/hashpassword.service';
import { User } from '../app/user.model';
import { Model, ObjectId, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ResponseType, TokensType } from './types/respType';
import { Sessions, SessionsSchemaType } from 'src/sessions/session.model';
import { v4 as uuidv4 } from 'uuid';
import { SessionsService } from 'src/sessions/sessions.service';
import { JWToken } from 'src/features/jwt/jwt.token';
import { MailService } from 'src/mailActivation/mail.service';
import * as dotenv from 'dotenv';

dotenv.config()



@Injectable()
export class AppService {
  constructor(private readonly HashpasswordService: HashpasswordService,
    private readonly MailService: MailService,
    private readonly JWToken: JWToken,
    private readonly sessionsService: SessionsService,
    @InjectModel(User.name) private UserModel: Model<User>, @InjectModel(Sessions.name) private SessionsModel: Model<Sessions>) { }


  async signUp(userDto: UserSignUpDto): Promise<ResponseType<UserSchemaType, Types.ObjectId, TokensType>> {

    const hashPass = await this.HashpasswordService.hashPassword(userDto.password)
    const activaitionLink = uuidv4()
    const dataWithHashPass = { ...userDto, password: hashPass, activaitionLink: activaitionLink }
    const allUsers = await this.UserModel.find();
    const filtred_email = allUsers.filter(u => u.email === userDto.email)
    if (filtred_email.length > 0) {
      const email_validate_resp = { message: 'User with this email address already exists' }
      return email_validate_resp
    }

    const user = await this.UserModel.create(dataWithHashPass)
    await this.MailService.sendActivationMail(user.email, `${process.env.API_URL}/v1/activate/${user.activaitionLink}`)

    const token = this.JWToken.generateToken({ email: user.email, isActivated: user.isActivated, id: user._id })
    const session = await this.sessionsService.saveToken(user._id, token.refreshToken)
    const session_id = session._id
    const response_signup = { message: `Welcome ❤️‍🔥 ${user.name} `, user, session_id, token }
    return response_signup
  }


  async login(userDto: UserLoginDto): Promise<ResponseType<UserSchemaType, Types.ObjectId, TokensType>> {
    const { email } = userDto
    const [user] = await this.UserModel.find({
      email
    });

    if (!user) {
      throw new HttpException('Please register 🚀', HttpStatus.CONFLICT)
    }
    const calcHashPass = await this.HashpasswordService.hashPassword(userDto.password)
    if (!user || user.password !== calcHashPass) {
      throw new HttpException('incorrect password', HttpStatus.BAD_REQUEST)
    }
    const token = this.JWToken.generateToken({ email: user.email, isActivated: user.isActivated, id: user._id })
    const session = await this.sessionsService.saveToken(user._id, token.refreshToken)
    const session_id = session._id
    const response_login = { message: `Welcome ❤️‍🔥 ${user.name} `, session_id, user, token }

    return response_login
  }

  async activate(activaitionLink: string) {
    const user = await this.UserModel.findOne({ activaitionLink })

    if (!user) {
      throw new HttpException('User is not finded ', HttpStatus.BAD_REQUEST)
    }
    user.isActivated = true;
    await user.save()

  }

  async logout(sessionID: string) {
    if (!sessionID) {
      throw new HttpException('We can`t stop session because this session not founded ', HttpStatus.CONFLICT)
    }
    const deleted_session = await this.SessionsModel.findByIdAndDelete(sessionID)
    return deleted_session
  }


  async googleLogin(req: Request & { user: any }) {
    if (!req.user) {
      return 'No user from google'
    }

    return {
      message: 'User information from google',
      user: req.user
    }
  }

}

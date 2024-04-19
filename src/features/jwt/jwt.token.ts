import { Injectable } from "@nestjs/common";
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config()

@Injectable()
export class JWToken {
    generateToken(payload: object) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' })
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' })
        return { accessToken, refreshToken }
    }
}


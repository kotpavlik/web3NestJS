import { Injectable } from "@nestjs/common";
import * as crypto from "crypto";


@Injectable()
export class HashpasswordService {
    async hashPassword(password: string): Promise<string> {
        const salt = "my_salt";
        return crypto
            .createHash("sha256")
            .update(password + salt)
            .digest("hex");
    }
}


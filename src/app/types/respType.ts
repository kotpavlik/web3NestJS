
import { Types } from "mongoose"
import { UserSchemaType } from "../user.model"

export type ResponseType<D, T, S> = {
    message: string,
    session_id?: Types.ObjectId,
    user?: UserSchemaType,
    tokens?: TokensType
}

export type TokensType = {
    accessToken: string
    refreshToken: string

}
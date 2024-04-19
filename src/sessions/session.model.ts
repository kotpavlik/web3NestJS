import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import mongoose, { Document } from "mongoose";




@Schema()
export class Sessions {
    @ApiProperty({ example: '34545qqwer5454645g45g445h45h45h', description: 'user id' })
    @Prop({ required: true, ref: 'User' })
    user_id: mongoose.Schema.Types.ObjectId

    @ApiProperty({ example: 'v34fa-xcvxcd-1223kfu-sa-fds', description: 'for confirm email' })
    @Prop({ required: true })
    refreshToken: string


}
export type SessionsSchemaType = Sessions & Document;

export const SessionsSchema = SchemaFactory.createForClass(Sessions)

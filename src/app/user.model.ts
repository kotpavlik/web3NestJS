import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { genderEnum } from "./types/gender.enum";
import { roleEnum } from "./types/role.enum";
import { ApiProperty } from "@nestjs/swagger";



@Schema()
export class User {

    @ApiProperty({ example: 'example@gmail.com', description: 'user email' })
    @Prop({ required: true })
    email: string

    @ApiProperty({ example: 'Ivan', description: 'user first name' })
    @Prop({ required: true })
    name: string

    @ApiProperty({ example: 'pasword123', description: 'user password' })
    @Prop({ required: true })
    password: string

    @ApiProperty({ example: 'v34fa-xcvxcd-1223kfu-sa-fds', description: 'for confirm email' })
    @Prop({ default: null })
    activaitionLink: string

    @ApiProperty({ example: true, description: 'for activated' })
    @Prop({ default: false })
    isActivated: boolean

    @ApiProperty({ example: '/assets/avatars/445325235522mkmdkf', description: 'user avatar' })
    @Prop({ default: null })
    avatar: string

    @ApiProperty({ example: '445325235522mkmdkf', description: 'user avatar id' })
    @Prop({ default: null })
    avatarId: string


    @ApiProperty({ example: 'user', description: 'user role', enum: roleEnum })
    @Prop({ enum: Object.values(roleEnum), default: roleEnum.basic_user })
    role: string

}

export type UserSchemaType = User & Document;


export const UserSchema = SchemaFactory.createForClass(User)

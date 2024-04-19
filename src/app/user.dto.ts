import { IsEmail, IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'


export class UserSignUpDto {
    @ApiProperty({ example: 'example@gmail.com', description: 'user email' })
    @IsEmail() @IsNotEmpty()
    readonly email: string

    @ApiProperty({ example: 'pasword123', description: 'user password' })
    @IsString() @IsNotEmpty()
    readonly password: string

    @ApiProperty({ example: 'Ivan', description: 'user first name' })
    @IsString() @IsNotEmpty()
    readonly name: string


}

export class UserLoginDto {
    @ApiProperty({ example: 'example@gmail.com', description: 'user email' })
    @IsEmail() @IsNotEmpty()
    readonly email: string
    @ApiProperty({ example: 'pasword123', description: 'user password' })
    @IsString() @IsNotEmpty()
    readonly password: string
}


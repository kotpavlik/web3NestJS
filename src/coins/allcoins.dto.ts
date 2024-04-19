import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class AllCoinsDTO {
    @ApiProperty({ example: 'WlwkHkuH4IPGLVGWO6', description: ' ByBit ApiKey' })
    @IsString() @IsNotEmpty()
    readonly APIKey: string

    @ApiProperty({ example: 'QcOu3J5vXnbdwAr94CXVq00fmi6McI6lV9fg', description: ' ByBit API Secret Key' })
    @IsString() @IsNotEmpty()
    readonly APISecretKEY: string
}
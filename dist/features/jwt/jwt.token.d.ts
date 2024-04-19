export declare class JWToken {
    generateToken(payload: object): {
        accessToken: string;
        refreshToken: string;
    };
}

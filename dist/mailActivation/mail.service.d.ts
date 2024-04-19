export declare class MailService {
    constructor();
    sendActivationMail(to: string, activationLink: string): Promise<void>;
}

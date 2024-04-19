import { SessionsSchemaType } from "src/sessions/session.model";
import { UserSchemaType } from "../user.model";
export type ResponseType<D, T> = {
    message: string;
    session?: SessionsSchemaType;
    user?: UserSchemaType;
};

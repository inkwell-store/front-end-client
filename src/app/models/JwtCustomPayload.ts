import { JwtPayload } from "jwt-decode";

export interface JwtCustomPayload extends JwtPayload {
    roles: string[];
}

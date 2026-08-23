import { JwtPayload } from "jwt-decode";

export interface JwtToken extends JwtPayload {
    roles: string[];
}

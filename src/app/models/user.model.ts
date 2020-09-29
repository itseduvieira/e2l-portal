import { Role } from "./role.model";

export class User {
    displayName: string;
    email: string;
    password: string;
    phoneNumber: string;
    uid?: string;
    emailVerified?: boolean;
    customClaims: Role;
}
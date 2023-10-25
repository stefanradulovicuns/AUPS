export class AuthenticationResponse {
    personName: string | null = null;
    email: string | null = null;
    token: string | null = null;
    expirationTime: Date | null = null;
}
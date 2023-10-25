export class AuthenticationResponse {
    constructor(accessToken, refreshToken) {
        this.access_token = accessToken;
        this.refresh_token = refreshToken;
    }
}


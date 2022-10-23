export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface DefaultTokenPayload {
  userId: number;
  identity: string;
}

export interface AccessTokenPayload extends DefaultTokenPayload {}

export interface RefreshTokenPayload extends DefaultTokenPayload {
  refreshTokenId: number;
}

import { sign, verify, JwtPayload } from "jsonwebtoken";
import * as dotenv from "dotenv";
import {
  AccessTokenPayload,
  DefaultTokenPayload,
  RefreshTokenPayload,
  TokenResponse,
} from "../interfaces/Token.interfaces";
import RefreshTokenRepository from "../../repositories/RefreshToken.repository";
import { RefreshToken } from "../../models/RefreshToken.model";
import ApiError from "../response/error";
dotenv.config();

class TokenUtils {
  private generateAccessToken = (tokenPayload: AccessTokenPayload): string => {
    return sign(tokenPayload, process.env.ACCESS_TOKEN_PRIVATE_KEY || "", {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME,
    });
  };

  private generateRefreshToken = async (
    tokenPayload: DefaultTokenPayload
  ): Promise<string> => {
    const newToken: RefreshToken = await RefreshTokenRepository.create(
      tokenPayload.userId
    );
    const refreshTokenPayload: RefreshTokenPayload = {
      ...tokenPayload,
      refreshTokenId: newToken.id,
    };
    return sign(
      refreshTokenPayload,
      process.env.REFRESH_TOKEN_PRIVATE_KEY || "",
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRATION_TIME,
      }
    );
  };

  public async generateTokens(
    tokenPayload: DefaultTokenPayload
  ): Promise<TokenResponse> {
    return {
      accessToken: this.generateAccessToken(tokenPayload),
      refreshToken: await this.generateRefreshToken(tokenPayload),
    };
  }

  public verifyAccessToken(token: string): AccessTokenPayload {
    return verify(
      token,
      process.env.ACCESS_TOKEN_PRIVATE_KEY || ""
    ) as AccessTokenPayload;
  }

  public verifyRefreshToken(token: string): RefreshTokenPayload {
    return verify(
      token,
      process.env.REFRESH_TOKEN_PRIVATE_KEY || ""
    ) as RefreshTokenPayload;
  }

  public async createTokensByRefresh(token: string): Promise<TokenResponse> {
    const tokenPayload: RefreshTokenPayload = this.verifyRefreshToken(token);
    console.log(tokenPayload);
    const savedToken = await RefreshTokenRepository.findById(
      tokenPayload.refreshTokenId
    );
    if (!savedToken) {
      throw ApiError.forbidden("Refresh token is not validated");
    } else {
      RefreshTokenRepository.deleteById(savedToken.id);
      return await this.generateTokens({
        userId: tokenPayload.userId,
        identity: tokenPayload.identity,
      });
    }
  }

  public async deleteAllRefreshTokensCreatedByUser(
    userId: number
  ): Promise<void> {
    await RefreshTokenRepository.deleteByUserId(userId);
  }
}

export default new TokenUtils();

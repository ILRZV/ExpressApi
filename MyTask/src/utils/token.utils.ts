import { sign, verify, JwtPayload } from "jsonwebtoken";
import * as dotenv from "dotenv";
import { TokenPayload, TokenResponse } from "../interfaces/Token.interfaces";
dotenv.config();

class TokenUtils {
  private generateAccessToken = (tokenPayload: TokenPayload): string => {
    return sign(tokenPayload, process.env.ACCESS_TOKEN_PRIVATE_KEY || "", {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME,
    });
  };

  private generateRefreshToken = (tokenPayload: TokenPayload): string => {
    return sign(tokenPayload, process.env.REFRESH_TOKEN_PRIVATE_KEY || "", {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRATION_TIME,
    });
  };

  public async generateTokens(
    tokenPayload: TokenPayload
  ): Promise<TokenResponse> {
    return {
      accessToken: this.generateAccessToken(tokenPayload),
      refreshToken: this.generateRefreshToken(tokenPayload),
    };
  }

  public verifyAccessToken(token: string): JwtPayload {
    return verify(
      token,
      process.env.ACCESS_TOKEN_PRIVATE_KEY || ""
    ) as JwtPayload;
  }

  public verifyRefreshToken(token: string): JwtPayload {
    return verify(
      token,
      process.env.REFRESH_TOKEN_PRIVATE_KEY || ""
    ) as JwtPayload;
  }
}

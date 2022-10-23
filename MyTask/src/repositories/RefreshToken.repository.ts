import { RefreshToken } from "../models/RefreshToken.model";

class RefreshTokenRepository {
  async create(userId: number): Promise<RefreshToken> {
    return await RefreshToken.create({ userId });
  }

  async findById(id: number): Promise<RefreshToken | null> {
    return await RefreshToken.findOne({
      where: { id },
    });
  }

  async deleteById(id: number) {
    return await RefreshToken.destroy({ where: { id } });
  }

  async deleteByUserId(userId: number) {
    return await RefreshToken.destroy({
      where: {
        userId,
      },
    });
  }
}

export default new RefreshTokenRepository();

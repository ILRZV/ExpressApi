import { User } from "../models/User.model";

export interface IUser {
  identity: string;
  password: string;
}
class UserRepository {
  async createUser(user: IUser): Promise<User> {
    return await User.create({ ...user });
  }

  async getUserById(id: number): Promise<User | null> {
    return await User.findByPk(id);
  }

  async getUserByIdentity(identity: string) {
    return await User.findOne({ where: { identity } });
  }
}

export default new UserRepository();

import { User } from "../models/User.model";

export interface IUser {
  password: string;
}
class UserRepository {
  async createUser(user: IUser): Promise<User> {
    return await User.create({ password: user.password });
  }

  async getUserById(id: number): Promise<User | null> {
    return await User.findByPk(id);
  }
}

export default new UserRepository();

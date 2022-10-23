import { IPagination } from "../common/utils/pagination.utils";
import { File } from "../models/File.model";

export interface IFile {
  userId: number;
  name: string;
  extension: string;
  mimetype: string;
  size: number;
}
class UserRepository {
  async create(file: IFile): Promise<File> {
    return await File.create({ ...file });
  }

  async getFiles(pagination: IPagination): Promise<File[]> {
    return await File.findAll({
      limit: pagination.limit,
      offset: pagination.offset,
    });
  }

  async getById(id: number): Promise<File | null> {
    return await File.findByPk(id);
  }

  async delete(id: number): Promise<number> {
    return await File.destroy({ where: { id } });
  }

  async update(id: number, file: IFile) {
    return File.update({ ...file }, { where: { id } });
  }
}

export default new UserRepository();

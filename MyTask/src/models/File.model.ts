import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
} from "sequelize-typescript";
import { User } from "./User.model";

@Table({
  timestamps: true,
  tableName: "files",
})
export class File extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @ForeignKey(() => User) @Column userId!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  extension!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  mimetype!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  size!: number;
}

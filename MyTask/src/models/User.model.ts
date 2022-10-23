import { Table, Model, Column, DataType, HasMany } from "sequelize-typescript";
import { RefreshToken } from "./RefreshToken.model";

@Table({
  timestamps: false,
  tableName: "users",
})
export class User extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  identity!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;
}

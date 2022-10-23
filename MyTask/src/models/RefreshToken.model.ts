import {
  Table,
  Model,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import { User } from "./User.model";
@Table({
  timestamps: true,
  tableName: "refresh_token",
})
export class RefreshToken extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @ForeignKey(() => User) @Column userId!: number;
  //   @Column({
  //     type: "TIMESTAMP",
  //     defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
  //     onUpdate: Sequelize.literal("CURRENT_TIMESTAMP") as any,
  //     allowNull: false,
  //   })
  //   createdAt!: string;
}

import { Sequelize } from "sequelize-typescript";
import * as dotenv from "dotenv";
import { User } from "../models/User.model";
import { RefreshToken } from "../models/RefreshToken.model";
import { File } from "../models/File.model";
dotenv.config();

console.log(process.env.MYSQLDB_USER);
const connection = new Sequelize({
  dialect: "mysql",
  host: process.env.MYSQLDB_HOST,
  username: process.env.MYSQLDB_USER,
  password: process.env.MYSQLDB_ROOT_PASSWORD,
  database: process.env.MYSQLDB_DATABASE,
  logging: false,
  models: [User, RefreshToken, File],
});

export default connection;

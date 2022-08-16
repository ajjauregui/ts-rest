import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const name = process.env.DBNAME || "node";
const password = process.env.DBPASSWORD;
const user = process.env.DBUSER || "root";
const host = process.env.DBHOST;

const db = new Sequelize(name, user, password, {
  host: host,
  dialect: "mysql",
  //loggin: false,
});

export default db;

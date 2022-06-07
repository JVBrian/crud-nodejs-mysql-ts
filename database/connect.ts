import { Sequelize } from "sequelize";

export const db = new Sequelize("node", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

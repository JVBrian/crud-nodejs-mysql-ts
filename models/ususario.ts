import { DataTypes } from "sequelize";
import { db } from "../database/connect";

export const Usuario = db.define("usuario", {
  nombre: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  estado: {
    type: DataTypes.STRING,
  },
});

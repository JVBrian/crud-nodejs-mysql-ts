import express, { Application } from "express";
import userRoutes from "../routes/usuarios.routes";
import cors from "cors";
import { db } from "../database/connect";

export class Server {
  private app: Application;
  private port: string;
  private apiRoutes = {
    usuarios: "/api/usuarios",
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "8000";
    this.dbConnect();
    this.middlewares();
    this.routes();
  }

  async dbConnect() {
    try {
      await db.authenticate();
      console.log("Se ha conectado a la base de datos");
    } catch (error: any) {
      throw new Error(error);
    }
  }

  middlewares() {
    //Trabajando con el Cross Domain
    this.app.use(cors());

    //Lectura del body
    this.app.use(express.json());

    //Carpeta pública
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.apiRoutes.usuarios, userRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor arrancado en el puerto: ${this.port}`);
    });
  }
}

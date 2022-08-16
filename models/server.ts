import express, { Application } from "express";
import userRoutes from "../routes/usuario";
import cors from "cors";
import db from "../db/connection";

class Server {
  private app: Application;
  private port: string;

  private apiPaths = {
    usuarios: "/api/usuarios",
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "9000";

    //Metodos iniciales
    this.dbConnection();
    this.middlewares();
    this.routes();
  }
  routes() {
    this.app.use(this.apiPaths.usuarios, userRoutes);
  }
  async dbConnection() {
    try {
      await db.authenticate();
      console.log("Database online");
    } catch (error) {
      console.log(error);
    }
  }
  middlewares() {
    //CORS
    this.app.use(cors());

    //LEctura de body
    this.app.use(express.json());

    //Carpeta Publica
    this.app.use(express.static("public"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor ejecutandose en el puerto " + this.port);
    });
  }
}
export default Server;

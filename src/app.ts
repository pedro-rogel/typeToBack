import express, { Response } from "express";
import router from "./routes";
import "reflect-metadata";
import { AppDataSource } from "./config/dbConfig";
const app = express();
router(app);

AppDataSource.initialize()
  .then(() => console.log("Bd conectado"))
  .catch((erro) => console.error("Erro: ", erro));
export default app;

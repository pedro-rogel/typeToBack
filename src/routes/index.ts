import express from "express";
import pets from "./routerPet.ts";
import adotante from "./routerAdotante.ts"
import { Request, Response } from "express";

const router = (app: express.Router) => {
  app
    .route("/")
    .get((req: Request, res: any) =>
      res.status(200).send("Curso de node Alura pets")
    );
  app.use(express.json(), pets);
  app.use(express.json(), adotante);
};
export default router;

import express from "express";
import petRouter from "../routes/routerPet";
const router = (app: express.Router) => {
  app.use("/pets", petRouter);
};
export default router;
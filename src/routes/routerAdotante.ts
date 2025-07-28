import express from "express";
import ControllerAdotante from "../controller/controllerAdotante";
import AdotanteRepository from "../repositories/adotanteRepository";
import { AppDataSource } from "../config/dbConfig";

const router = express.Router();
const adotanteRepository = new AdotanteRepository(
  AppDataSource.getRepository("AdotanteEntity")
);
const adotanteController = new ControllerAdotante(adotanteRepository);

router.get("/adotante", adotanteController.listarAdotante);
router.get("/adotante/:id", adotanteController.adotantePorId);
router.post("/adotante", adotanteController.criarAdotante);
router.put("/adotante/:id", adotanteController.atualizarAdotante);
router.delete("/adotante/:id", adotanteController.deletarAdotante);

export default router

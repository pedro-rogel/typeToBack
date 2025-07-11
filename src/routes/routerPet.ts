import express from "express";

import ControllerPet from "../controller/controllerPet";
import PetRepository from "../repositories/petRepositories";
import { AppDataSource } from "../config/dbConfig";

const router = express.Router();
const petRepository = new PetRepository(
  AppDataSource.getRepository("PetEntity")
);
const petController = new ControllerPet(petRepository);

router.get("/pets", petController.listarPet);
router.get("/pets/query", petController.queryParams);
router.get("/pets/:id", petController.petPorId);
router.post("/pets", petController.criarPet);
router.put("/pets/:id", petController.atualizaPet);
router.delete("/pets/:id", petController.deletePet);

export default router;

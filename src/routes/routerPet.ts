import express from "express";

import ControllerPet from "../controller/controllerPet";

const router = express.Router();

router.get("/pets", ControllerPet.listarPet);
router.get("/pets/:id", ControllerPet.petPorId);
router.post("/pets", ControllerPet.criarPet);
router.put("/pets/:id", ControllerPet.atualizaPet);
router.delete("/pets/:id", ControllerPet.deletePet);

export default router;

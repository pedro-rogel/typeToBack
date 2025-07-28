import express from "express";
import ControllerEndereco from "../controller/controllerEndereco";
import EnderecoRepository from "../repositories/enderecoRepository";
import { AppDataSource } from "../config/dbConfig";

const router = express.Router();
const enderecoRepository = new EnderecoRepository(
  AppDataSource.getRepository("EnderecoEntity")
);
const adotanteController = new ControllerEndereco(enderecoRepository);

router.get("/endereco", adotanteController.listarEndereco);
router.post("/endereco", adotanteController.criarEndereco);
router.put("/endereco/:id", adotanteController.atualizarEndereco);
router.delete("/endereco/:id", adotanteController.deletarEndereco);

export default router;

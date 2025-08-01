import express from "express";
import ControllerEndereco from "../controller/controllerEndereco";
import EnderecoRepository from "../repositories/enderecoRepository";
import { AppDataSource } from "../config/dbConfig";
import EnderecoEntity from "../entities/enderecoEntity";
import AdotanteEntity from "../entities/adotanteEntity";

const router = express.Router();

const enderecoRepo = AppDataSource.getRepository(EnderecoEntity);
const adotanteRepo = AppDataSource.getRepository(AdotanteEntity);

const enderecoRepository = new EnderecoRepository(enderecoRepo, adotanteRepo);

const enderecoController = new ControllerEndereco(enderecoRepository);

router.get("/endereco", enderecoController.listarEndereco);
router.post("/endereco", enderecoController.criarEndereco);
router.put("/endereco/:id", enderecoController.atualizarEndereco);
router.delete("/endereco/:id", enderecoController.deletarEndereco);

export default router;

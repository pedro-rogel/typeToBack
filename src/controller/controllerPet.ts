import { Request, RequestHandler, Response } from "express";

import PetRepository from "../repositories/petRepositories.ts";
import PetEntity from "../entities/petEntity.ts";

interface PetId {
  id: string;
}

class ControllerPet {
  constructor(private repository: PetRepository) {}
  listarPet: RequestHandler = async (req, res) => {
    const listaDePet = await this.repository.listarPet();
    res.status(200).json(listaDePet);
  };

  petPorId: RequestHandler<PetId> = async (req, res) => {
    const { id } = req.params;
    const petById = await this.repository.petPorId(Number(id));
    if (!petById)
      return res
        .status(404)
        .json({ message: "Erro ao encontrar o pet" }) as unknown as void;
    res.status(200).json(petById);
  };

  criarPet: RequestHandler = async (req, res) => {
    const { nome, dataNascimento, adotado, especie } = <PetEntity>req.body;
    try {
      const novoPet = new PetEntity(nome, especie, dataNascimento, adotado);

      this.repository.criarPet(novoPet);
      res.status(201).json(novoPet);
    } catch (error) {
      res.status(500).json({ message: `${error} - FALHA NA REQUISIÇÃO` });
    }
  };

  atualizaPet: RequestHandler<PetId> = async (req, res) => {
    const { id } = req.params;
    const { success, message } = await this.repository.atualizaPet(
      Number(id),
      req.body as PetEntity
    );
    if (!success) {
      return res.status(404).json({ message }) as unknown as void; // por causa do requestHandler, ele precisa retornar um void | Promise<void>
    }
    res.status(200).json("Atualizado com sucesso!");
  };

  deletePet: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const { success, message } = await this.repository.deletePet(Number(id));
    if (!success) return res.status(404).json({ message }) as unknown as void;
    res.status(204).send("Deletado com sucesso");
    return;
  };

  queryParams: RequestHandler = async (req, res) => {
    const adotado = req.query.adotado;
    const isAdotado = adotado === "true";
    const { success, message, petAdotado } = await this.repository.queryParams(
      isAdotado
    );
    const petFiltrado = await this.repository.queryParams(isAdotado);
    if (!success) return res.status(404).json({ message }) as unknown as void;
    res.status(200).json(petFiltrado.petAdotado);
  };
}

export default ControllerPet;

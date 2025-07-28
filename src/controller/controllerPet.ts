import { Request, RequestHandler, Response } from "express";

import PetRepository from "../repositories/petRepositories.ts";
import PetEntity from "../entities/petEntity.ts";
import geraIdade from "../functions/geraIdade.ts";
import convertLowerCase from "../functions/convertLowerCase.ts";

interface PetId {
  id: string;
}

class ControllerPet {
  constructor(private repository: PetRepository) {}
  listarPet: RequestHandler = async (req, res) => {
    try {
      const listaDePet = await this.repository.listarPet();
      res.status(200).json(listaDePet);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };

  petPorId: RequestHandler<PetId> = async (req, res) => {
    const { id } = req.params;
    try {
      const petById = await this.repository.petPorId(Number(id));
      if (!petById || petById === null)
        throw Error("Não há esse pet em pets cadastrados");

      res.status(200).json(petById);
    } catch (error) {
      res.status(500).json({ message: `Erro na requisição - ${error}` });
    }
  };

  criarPet: RequestHandler = async (req, res) => {
    const arrayFields = ["nome", "dataNascimento", "adotado", "especie"];
    const newPet = <PetEntity>req.body;
    const { nome, dataNascimento, adotado, especie } = req.body;
    const missingField = arrayFields.find((fieldName) => {
      if (!newPet[fieldName as keyof PetEntity]) {
        res
          .status(400)
          .json({ message: `Passe um valor para o campo ${fieldName}` });
        return true;
      }
      return false;
    });

    if (missingField) return;

    try {
      const idade = geraIdade(dataNascimento);
      const especieLowerCase = convertLowerCase(especie);
      const novoPet = new PetEntity(nome, especieLowerCase, idade, adotado);
      this.repository.criarPet(novoPet);
      res.status(201).json(novoPet);
    } catch (error) {
      res.status(500).json({ message: `${error} - FALHA NA REQUISIÇÃO` });
    }
  };

  atualizaPet: RequestHandler<PetId> = async (req, res) => {
    const { id } = req.params;
    try {
      const { success, message } = await this.repository.atualizaPet(
        Number(id),
        req.body as PetEntity
      );
      if (!success) throw Error();

      res
        .status(200)
        .json({ message: message, success: success });
    } catch (error) {
      const { success, message } = await this.repository.atualizaPet(
        Number(id),
        req.body as PetEntity
      );
      if (!success) {
        res.status(404).json({ message });
      }
    }
  };

  deletePet: RequestHandler = async (req, res) => {
    const { id } = req.params;
    try {
      const { success,message } = await this.repository.deletePet(Number(id));
      if (!success) throw Error();
      res
        .status(200)
        .json({ message: message, success: success });
    } catch (error) {
      const { success, message } = await this.repository.deletePet(Number(id));
      if (!success)
        res.status(404).json({ message: message, success: success });
    }
  };

  queryParams: RequestHandler = async (req, res) => {
    const adotado = req.query.adotado;
    const isAdotado = adotado === "true";
    try {
      const petFiltrado = await this.repository.queryParams(isAdotado);
      const { success, message } = await this.repository.queryParams(isAdotado);
      res.status(200).json({
        data: petFiltrado.petAdotado,
        message: message,
        success: success,
      });
    } catch (error) {
      const { success, message } = await this.repository.queryParams(isAdotado);
      if (!success) res.status(404).json({ message });
    }
  };
}

export default ControllerPet;

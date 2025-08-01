import { Request, RequestHandler, Response } from "express";

import PetRepository from "../repositories/petRepositories.ts";
import PetEntity from "../entities/petEntity.ts";
import geraIdade from "../functions/geraIdade.ts";
import convertLowerCase from "../functions/convertLowerCase.ts";
import { classToPlain, instanceToPlain } from "class-transformer";

interface PetId {
  id: string;
}

class ControllerPet {
  constructor(private repository: PetRepository) {}
  listarPet: RequestHandler = async (req, res) => {
    const listaDePet = await this.repository.listarPet();
    try {
      const petsTransformados = listaDePet.listaDePet?.map(pet => instanceToPlain(pet))
      res.status(200).json({
        data: petsTransformados,
        message: listaDePet.message,
        success: listaDePet.success,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: listaDePet.message, success: listaDePet.success });
    }
  };

  petPorId: RequestHandler<PetId> = async (req, res) => {
    const { id } = req.params;
    const petById = await this.repository.petPorId(Number(id));
    try {
      if (!petById.petPorId || petById.petPorId === null) throw Error();

      res.status(200).json({
        data: petById.petPorId,
        message: petById.message,
        success: petById.success,
      });
    } catch (error) {
      res.status(500).json({
        message: `${petById.message} - ${error}`,
        success: petById.success,
      });
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

    const idade = geraIdade(dataNascimento);
    const especieLowerCase = convertLowerCase(especie);
    const novoPet = new PetEntity(nome, especieLowerCase, idade, adotado);
    const response = await this.repository.criarPet(novoPet);
    try {
      if (!response.success) throw Error(response.message);
      res.status(201).json({
        data: response.petBody,
        success: response.success,
        message: response.message,
      });
    } catch (error) {
      res.status(500).json({ message: `${error} - ${response.message}` });
    }
  };

  atualizaPet: RequestHandler<PetId> = async (req, res) => {
    const { id } = req.params;
    const { success, message } = await this.repository.atualizaPet(
      Number(id),
      req.body as PetEntity
    );
    try {
      if (!success) throw Error();

      res.status(200).json({ message: message, success: success });
    } catch (error) {
      if (!success) {
        res.status(404).json({ message, success: success });
      }
    }
  };

  deletePet: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const { success, message } = await this.repository.deletePet(Number(id));
    try {
      if (!success) throw Error();
      res.status(200).json({ message: message, success: success });
    } catch (error) {
      if (!success)
        res.status(404).json({ message: `${message}`, success: success });
    }
  };

  queryParams: RequestHandler = async (req, res) => {
    const adotado = req.query.adotado;
    const isAdotado = adotado === "true";
    const petFiltrado = await this.repository.queryParams(isAdotado);
    const { success, message } = await this.repository.queryParams(isAdotado);
    try {
      res.status(200).json({
        data: petFiltrado.petAdotado,
        message: message,
        success: success,
      });
    } catch (error) {
      if (!success) res.status(404).json({ message });
    }
  };

  adotaPet: RequestHandler = async (req, res) => {
    const { pet_id, adotante_id } = req.params;
    const { success, message } = await this.repository.adotaPet(
      Number(pet_id),
      Number(adotante_id)
    );
    try {
      return !success
        ? (res
            .status(400)
            .json({ success: success, message: message }) as unknown as void)
        : (res
            .status(200)
            .json({ success: success, message: message }) as unknown as void);
    } catch (error) {
      res.status(500).json({ message: message, success: success });
    }
  };
}

export default ControllerPet;

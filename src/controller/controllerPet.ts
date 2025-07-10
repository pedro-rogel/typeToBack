import { Request, Response } from "express";
import PetsModel from "../models/modelsPets.ts";
import geraId from "../functions/geraId.ts";
import geraIdade from "../functions/geraIdade.ts";
import convertLowerCase from "../functions/convertLowerCase.ts";

let listaDePet: PetsModel[] = [];

class ControllerPet {
  static listarPet(req: Request, res: Response) {
    res.status(200).json(listaDePet);
  }

  static petPorId(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const petPorId = listaDePet.find((pet) => pet.id === Number(id));
      if (!petPorId) throw Error("Pet não encontrado");
      res.status(200).json(petPorId);
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - FALHA NA REQUISIÇÃO` });
    }
  }

  static criarPet(req: Request, res: Response) {
    const { nome, dataNascimento, adotado, especie } = <PetsModel>req.body;
    try {
      const novoPet: PetsModel = {
        id: geraId(),
        nome,
        dataNascimento: geraIdade(dataNascimento),
        adotado,
        especie: convertLowerCase(especie),
      };
      listaDePet.push(novoPet);
      res.status(201).json(novoPet);
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - FALHA NA REQUISIÇÃO` });
    }
  }

  static atualizaPet(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const { nome, dataNascimento, adotado, especie } = <PetsModel>req.body;
      const pet = listaDePet.find((pet) => pet.id === Number(id));
      if (!pet) throw Error("Pet não encontrado");
      if (nome) pet.nome = nome;
      if (dataNascimento) pet.dataNascimento = dataNascimento;
      if (adotado) pet.adotado = adotado;
      if (especie) pet.especie = especie;

      res.status(200).json(pet);
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - FALHA NA REQUISIÇÃO` });
    }
  }

  static deletePet(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const pet = listaDePet.find((pet) => pet.id === Number(id));
      if (!pet) throw Error("Pet não encontrado");
      const indexPet = listaDePet.indexOf(pet);
      listaDePet.splice(indexPet, 1);
      res.status(200).json({ message: "Pet delatado com sucesso" });
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - FALHA NA REQUISIÇÃO` });
    }
  }

  static queryParams(req: Request, res: Response) {
    const adotado = req.query.adotado; 
    try {
      if (!adotado) throw Error("Passe um filtro válido");
      const isAdotado = adotado === "true";
      const adotadoQuery = listaDePet.filter((pet) => {
        if (adotado !== undefined) return pet.adotado === isAdotado;
        return true
      });
      res.status(200).json(adotadoQuery);
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - FALHA NA REQUISIÇÃO` });
    }
  }
}

export default ControllerPet;

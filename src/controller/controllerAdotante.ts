import { RequestHandler } from "express";

import AdotanteEntity from "../entities/adotanteEntity";
import AdotanteRepository from "../repositories/adotanteRepository";

class ControllerAdotante {
  constructor(private repository: AdotanteRepository) {}
  listarAdotante: RequestHandler = async (req, res) => {
    const { success, listadeAdotante, message } =
      await this.repository.listarAdotande();
    try {
      res
        .status(200)
        .json({ data: listadeAdotante, message: message, success });
    } catch (error) {
      res.status(500).json({ message: `${message}`, success: success });
    }
  };

  adotantePorId: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const { success, adotantePorId, message } =
      await this.repository.adotandePorId(Number(id));
    try {
      if (adotantePorId === null || !success) throw Error();
      res
        .status(200)
        .json({ data: adotantePorId, message: message, success: success });
    } catch (error) {
      res
        .status(500)
        .json({ message: `${message} - ${error}`, success: success });
    }
  };

  criarAdotante: RequestHandler = async (req, res) => {
    const arrayFields = ["name", "password", "phone"];
    const newAdotado = <AdotanteEntity>req.body;
    const { name, password, address, phone, photo } = <AdotanteEntity>req.body;

    const missingField = arrayFields.find((fieldName) => {
      if (!newAdotado[fieldName as keyof AdotanteEntity]) {
        res.status(400).json({
          message: `Passe um valor para o campo ${fieldName}`,
        });
        return true;
      }
      return false;
    });

    if (missingField) return;

    const novoAdotante = new AdotanteEntity(
      name,
      password,
      phone,
      photo,
      address
    );
    const { success, adotanteBody, message } =
      await this.repository.criarAdotante(novoAdotante);
    try {
      res
        .status(200)
        .json({ data: adotanteBody, success: success, message: message });
    } catch (error) {
      res
        .status(500)
        .json({ message: `${message} - ${error}`, success: success });
    }
  };

  atualizarAdotante: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const { message, success, adotanteAtualizado } =
      await this.repository.atualizarAdotante(
        Number(id),
        req.body as AdotanteEntity
      );
    try {
      if (!success) throw Error();
      res
        .status(200)
        .json({ data: adotanteAtualizado, message: message, success: success });
    } catch (error) {
      if (!success) res.status(404).json({ message, success: success });
    }
  };

  deletarAdotante: RequestHandler = async (req, res) => {
    const { id } = req.params;
    try {
      const { success, message } = await this.repository.deletarAdotante(
        Number(id)
      );
      if (!success) throw Error();
      res.status(200).json({ message: message, success: success });
    } catch (error) {
      const { success, message } = await this.repository.deletarAdotante(
        Number(id)
      );
      if (!success) res.status(404).json({ message, success: success });
    }
  };
}

export default ControllerAdotante;

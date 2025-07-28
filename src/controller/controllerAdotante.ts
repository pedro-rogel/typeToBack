import { RequestHandler } from "express";

import AdotanteEntity from "../entities/adotanteEntity";
import AdotanteRepository from "../repositories/adotanteRepository";

class ControllerAdotante {
  constructor(private repository: AdotanteRepository) {}
  listarAdotante: RequestHandler = async (req, res) => {
    try {
      const listaDeAdotantes = await this.repository.listarAdotande();
      res.status(200).json(listaDeAdotantes);
    } catch (error) {
      res.status(500).json({ message: `Error - ${error}` });
    }
  };

  adotantePorId: RequestHandler = async (req, res) => {
    const { id } = req.params;
    try {
      const adotantePorId = await this.repository.adotandePorId(Number(id));
      if (adotantePorId === null) throw Error;
      res.status(200).json(adotantePorId);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao encontrar o Adotante" }) as unknown as void;
    }
  };

  criarAdotante: RequestHandler = async (req, res) => {
    const arrayFields = ["name", "password", "address", "phone", "photo"];
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

    try {
      const novoAdotante = new AdotanteEntity(
        name,
        password,
        phone,
        photo,
        address
      );
      this.repository.criarAdotante(novoAdotante);
      res.status(200).send("Criado com Sucesso");
    } catch (error) {
      res.status(500).json({ message: `Erro - ${error}` });
    }
  };

  atualizarAdotante: RequestHandler = async (req, res) => {
    const { id } = req.params;
    try {
      const { message, success } = await this.repository.atualizarAdotante(
        Number(id),
        req.body as AdotanteEntity
      );
      if (!success) throw Error()
      res.status(200).json({ message: message });
    } catch (error) {
      const { success, message } = await this.repository.atualizarAdotante(
        Number(id),
        req.body as AdotanteEntity
      );
      if (!success) return res.status(404).json({ message }) as unknown as void;
    }
  };

  deletarAdotante: RequestHandler = async (req, res) => {
    const { id } = req.params;
    try {
      const delet = await this.repository.deletarAdotante(Number(id));
      res.status(200).json({ message: "Deletado com sucesso!" });
    } catch (error) {
      const { success, message } = await this.repository.deletarAdotante(
        Number(id)
      );
      if (!success) return res.status(404).json({ message }) as unknown as void;
    }
  };
}

export default ControllerAdotante;

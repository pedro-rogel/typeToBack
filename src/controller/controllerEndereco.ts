import { RequestHandler } from "express";
import { Repository } from "typeorm";
import EnderecoEntity from "../entities/enderecoEntity";
import EnderecoRepository from "../repositories/enderecoRepository";

class ControllerEndereco {
  constructor(private repository: EnderecoRepository) {}
  listarEndereco: RequestHandler = async (req, res) => {
    try {
      const listadeEnderecos = await this.repository.listarEndereco();
      res.status(200).json({
        listadeEnderecos,
        message: "Requisição realizada com sucesso!",
      });
    } catch (error) {
      res.status(500).json({ message: `Error - ${error}` });
    }
  };

  criarEndereco: RequestHandler = async (req, res) => {
    const addressFieldName = [
      "street",
      "city",
      "state",
      "neighborhood",
      "number",
      "zip",
    ];
    const newEndereco = <EnderecoEntity>req.body;
    const { street, city, state, neighborhood, number, zip } = <EnderecoEntity>(
      req.body
    );

    const missingField = addressFieldName.find((addressFieldName) => {
      if (!newEndereco[addressFieldName as keyof EnderecoEntity]) {
        res.status(400).json({
          message: `Passe um valor para  ioo campo ${addressFieldName}`,
        });
        return true;
      }
      return false;
    });

    if (missingField) return;

    const criarEndereco = new EnderecoEntity(
      street,
      city,
      state,
      neighborhood,
      number,
      zip
    );
    const response = await this.repository.criarEndereco(criarEndereco);
    try {
      res.status(200).json({
        data: criarEndereco,
        resnponse: { message: response.message, success: response.success },
      });
    } catch (error) {
      res.status(400).json({
        message: `${response.message} - ${error}`,
        success: response.success,
      });
    }
  };

  atualizarEndereco: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const response = await this.repository.atualizarEndereco(
      Number(id),
      req.body as EnderecoEntity
    );
    try {
      if (!response.success) throw Error();
      res.status(200).json({
        data: response.addressUpdate,
        message: response.message,
        success: response.success,
      });
    } catch (error) {
      res.status(400).json({
        message: `${response.message} - ${error}`,
        success: response.success,
      });
    }
  };

  deletarEndereco: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const { success, message } = await this.repository.deletarEndereco(
      Number(id)
    );
    try {
      if (!success) throw Error();
      res.status(200).json({ message: message, success: success });
    } catch (error) {
      res.status(400).json({ message: `${message} - ${error}` });
    }
  };
}

export default ControllerEndereco;

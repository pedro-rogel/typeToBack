import { Request, Response } from "express";
import PetsModel from "../models/modelsPets.ts";
import EnumEspecie from "../models/enumEspecie.ts";

let listaDePet: PetsModel[] = [];
let id = 0;

const geraId = () => (id += 1);

const geraIdade = (data: string) => {
  const currentDate = new Date();
  const formatDate = currentDate.toLocaleDateString().split("/");
  const [currentDay, currentMonth, currentYear] = formatDate;
  const [diatInput, monthInput, yearInput] = data.split("/");

  if (yearInput.length !== 4)
    // condição para ver se a data está no formato correto
    throw Error("Formato de data inválido, passe no formato 'DD/MM/YYYY'!");

  if (Number(yearInput) > Number(currentYear)) {
    // condição para ver se o ano que foi passado é maior do que o ano atual
    throw Error(
      "Passe uma data válida, não tem como o ano que foi passado ser maior do que o ano atual"
    );
  }

  if (Number(monthInput) > Number(currentMonth)) {
    // condição para ver se o mes é maior do que o mes atual, se for igual o mes atual, verifica se o dia é maior do que o dia atual
    if (Number(diatInput) > Number(currentDay))
      throw Error("Passe uma data válida");
  }

  return String(Number(currentYear) - Number(yearInput));
};

console.log(geraIdade("20/06/2006"));

class ControllerPet {
  static listarPet(req: Request, res: Response) {
    res.status(200).json({ data: listaDePet });
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
      if (!Object.values(EnumEspecie).includes(especie))
        throw Error("Especie precisa ser 'Cachorro' ou 'gato'");
      const novoPet: PetsModel = {
        id: geraId(),
        nome,
        dataNascimento: geraIdade(dataNascimento),
        adotado,
        especie,
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
      pet.nome = nome;
      pet.dataNascimento = dataNascimento;
      pet.adotado = adotado;
      pet.especie = especie;
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
}

export default ControllerPet;

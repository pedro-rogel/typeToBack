import { Repository } from "typeorm";
import PetEntity from "../entities/petEntity";
import InterfacePet from "./interfaces/interfacePet";

export default class PetReposotory implements InterfacePet {
  private repository: Repository<PetEntity>;
  constructor(repository: Repository<PetEntity>){
    this.repository = repository
  }
  listarPet(): Array<PetEntity> {
    throw new Error("Method not implemented.");
  }
  petPorId(id: number): void {
    throw new Error("Method not implemented.");
  }
  criarPet(pet: PetEntity): void {
    throw new Error("Method not implemented.");
  }
  atualizaPet(id: number, pet: PetEntity): void {
    throw new Error("Method not implemented.");
  }
  deletePet(id: number, pet: PetEntity): void {
    throw new Error("Method not implemented.");
  }
}

import { Repository } from "typeorm";
import PetEntity from "../entities/petEntity";
import InterfacePet from "./interfaces/interfacePet";

export default class PetRepository implements InterfacePet {
  private repository: Repository<PetEntity>;
  constructor(repository: Repository<PetEntity>) {
    this.repository = repository;
  }

  async listarPet(): Promise<Array<PetEntity>> {
    try {
      return await this.repository.find();
    } catch (error) {
      throw Error(`Erro ao listar pets, ${error}`);
    }
  }
  async petPorId(id: number): Promise<PetEntity>  {
    try {
      const pet =  await this.repository.findOne({ where: { id } });
      if(!pet) throw new Error("Pet não encontrado")
        return pet
    } catch (error) {
      throw Error(`Erro ao trazer o pet, ${error}`);
    }
  }
  async criarPet(pet: PetEntity): Promise<void> {
    try {
      await this.repository.save(pet);
    } catch (error) {
      throw Error(`Erro ao criar o pet, ${error}`);
    }
  }
  async atualizaPet(
    id: number,
    pet: PetEntity
  ): Promise<{ success: boolean; message?: string }> {
    try {
      const petToUpdate = await this.repository.findOne({ where: { id } });
      if (!petToUpdate) {
        return { success: false, message: "Pet não encontrado" };
      }
      Object.assign(petToUpdate, pet);
      await this.repository.save(petToUpdate);
      return { success: true };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: "Ocorreu um erro ao tentar atualizar o pet.",
      };
    }
  }
  async deletePet(id: number): Promise<{ success: boolean; message?: string }> {
    try {
      const petToDelete = await this.repository.findOne({ where: { id } });
      if (!petToDelete)
        return { success: false, message: "Pet não encontrado" };
      await this.repository.remove(petToDelete);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: "Ocorreu um erro ao tentar excluir o pet",
      };
    }
  }
  async queryParams(
    adotado: boolean
  ): Promise<{ success: boolean; message?: string; petAdotado?: PetEntity[] }> {
    try {

      const adotadoParam = await this.repository.find({ where: { adotado } });
      if (!adotadoParam) return {success: false, message: "Passe um filtro válido"};
      return { success: true, petAdotado: adotadoParam };
    } catch (error) {
      return {
        success: false,
        message: "Ocorreu um erro ao executar a filtragem",
      };
    }
  }
}

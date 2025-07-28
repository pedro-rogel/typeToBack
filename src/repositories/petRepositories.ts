import { Repository } from "typeorm";
import PetEntity from "../entities/petEntity";
import InterfacePet from "./interfaces/interfacePet";

export default class PetRepository implements InterfacePet {
  private repository: Repository<PetEntity>;
  private messageTrue: string;
  private messageFalse: string;
  constructor(repository: Repository<PetEntity>) {
    this.repository = repository;
    this.messageTrue = "Requisição realizada com sucesso!";
    this.messageFalse = "Falha na requisição";
  }

  async listarPet(): Promise<{
    success: boolean;
    message?: string;
    listaDePet?: Array<PetEntity>;
  }> {
    const listaDePet = await this.repository.find();
    if (!listaDePet) {
      return {
        message: this.messageFalse,
        success: false,
      };
    }
    return {
      success: true,
      message: this.messageTrue,
      listaDePet: listaDePet,
    };
  }

  async petPorId(id: number): Promise<{
    petPorId?: PetEntity | null;
    success: boolean;
    message?: string;
  }> {
    const pet = await this.repository.findOne({ where: { id } });
    if (!pet)
      return {
        petPorId: null,
        success: false,
        message: `${this.messageFalse} - Pet não encontrado!`,
      };
    return {
      petPorId: pet,
      success: true,
      message: this.messageTrue,
    };
  }
  async criarPet(pet: PetEntity): Promise<{
    success: boolean;
    message?: string;
    petBody?: PetEntity;
  }> {
    const newPet = await this.repository.save(pet);
    return newPet
      ? { success: true, message: this.messageTrue, petBody: newPet }
      : { success: false, message: this.messageFalse };
  }
  async atualizaPet(
    id: number,
    pet: PetEntity
  ): Promise<{
    success: boolean;
    message?: string;
    petAtualizado?: PetEntity | null;
  }> {
    const petToUpdate = await this.repository.findOne({ where: { id } });
    if (!petToUpdate) {
      return { success: false, message: "Pet não encontrado!" };
    }
    Object.assign(petToUpdate, pet);
    await this.repository.save(petToUpdate);
    return {
      success: true,
      message: "Pet atualizado com sucesso!",
      petAtualizado: petToUpdate,
    };
  }
  async deletePet(id: number): Promise<{ success: boolean; message?: string }> {
    const petToDelete = await this.repository.findOne({ where: { id } });
    if (!petToDelete) return { success: false, message: "Pet não encontrado!" };
    await this.repository.remove(petToDelete);
    return { success: true, message: "Pet Deletado com sucesso!" };
  }
  async queryParams(
    adotado: boolean
  ): Promise<{ success: boolean; message?: string; petAdotado?: PetEntity[] }> {
    const adotadoParam = await this.repository.find({ where: { adotado } });
    if (!adotadoParam)
      return { success: false, message: "Passe um filtro válido" };
    return {
      success: true,
      petAdotado: adotadoParam,
      message: "Consulta realizada com sucesso!",
    };
  }
}

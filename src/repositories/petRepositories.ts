import { Repository } from "typeorm";
import PetEntity from "../entities/petEntity";
import InterfacePet from "./interfaces/interfacePet";

export default class PetRepository implements InterfacePet {
  private repository: Repository<PetEntity>;
  constructor(repository: Repository<PetEntity>) {
    this.repository = repository;
  }

  async listarPet(): Promise<Array<PetEntity>> {
    return await this.repository.find();
  }
  async petPorId(id: number): Promise<PetEntity | null> {
    const pet = await this.repository.findOne({ where: { id } });
    if (!pet) return null;
    return pet;
  }
  async criarPet(pet: PetEntity): Promise<void> {
    await this.repository.save(pet);
  }
  async atualizaPet(
    id: number,
    pet: PetEntity
  ): Promise<{ success: boolean; message?: string }> {
    const petToUpdate = await this.repository.findOne({ where: { id } });
    if (!petToUpdate) {
      return { success: false, message: "Pet não encontrado!" };
    }
    Object.assign(petToUpdate, pet);
    await this.repository.save(petToUpdate);
    return { success: true, message: "Pet atualizado com sucesso!" };
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
    return { success: true, petAdotado: adotadoParam, message: "Consulta realizada com sucesso!" };
  }
}

import { Repository } from "typeorm";
import AdotanteEntity from "../entities/adotanteEntity";
import InterfaceAdotande from "./interfaces/interfaceAdotante";

export default class AdotanteRepository implements InterfaceAdotande {
  private repository: Repository<AdotanteEntity>;
  constructor(repository: Repository<AdotanteEntity>) {
    this.repository = repository;
  }

  async listarAdotande(): Promise<Array<AdotanteEntity>> {
    return await this.repository.find();
  }

  async adotandePorId(id: number): Promise<AdotanteEntity | null> {
    return await this.repository.findOne({ where: { id } });
  }

  async criarAdotante(adotande: AdotanteEntity): Promise<void> {
    await this.repository.save(adotande);
  }
  async atualizarAdotante(
    id: number,
    adotande: AdotanteEntity
  ): Promise<{ success: boolean; message?: string }> {
    const adotanteToUpdate = await this.repository.findOne({ where: { id } });
    if (!adotanteToUpdate) {
      return { success: false, message: "Adotande não encontrado" };
    }
    Object.assign(adotanteToUpdate, adotande);
    await this.repository.save(adotanteToUpdate);
    return { success: true };
  }

  async deletarAdotante(
    id: number
  ): Promise<{ success: boolean; message?: string }> {
    const adotanteToDelete = await this.repository.findOne({ where: { id } });
    if (!adotanteToDelete)
      return { success: false, message: "Adotante não encontrado" };
    await this.repository.remove(adotanteToDelete);
    return { success: true };
  }
}

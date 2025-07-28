import { Repository } from "typeorm";
import AdotanteEntity from "../entities/adotanteEntity";
import InterfaceAdotande from "./interfaces/interfaceAdotante";

export default class AdotanteRepository implements InterfaceAdotande {
  private repository: Repository<AdotanteEntity>;
  private messageTrue: string;
  private messageFalse: string;
  constructor(repository: Repository<AdotanteEntity>) {
    this.repository = repository;
    this.messageTrue = "Requisição realizada com sucesso!";
    this.messageFalse = "Falha na requisição!";
  }

  async listarAdotande(): Promise<{
    listadeAdotante?: Array<AdotanteEntity>;
    success: boolean;
    message?: string;
  }> {
    const listadeAdotante = await this.repository.find();
    return listadeAdotante
      ? {
          message: this.messageTrue,
          success: true,
          listadeAdotante: listadeAdotante,
        }
      : { success: false, message: this.messageFalse };
  }

  async adotandePorId(id: number): Promise<{
    adotantePorId?: AdotanteEntity | null;
    success: boolean;
    message?: string;
  }> {
    const adotantePorId = await this.repository.findOne({ where: { id } });
    return adotantePorId
      ? {
          success: true,
          message: this.messageTrue,
          adotantePorId: adotantePorId,
        }
      : {
          success: false,
          message: this.messageFalse,
        };
  }

  async criarAdotante(adotande: AdotanteEntity): Promise<{
    adotanteBody?: AdotanteEntity;
    success: boolean;
    message?: string;
  }> {
    const criarAdotante = await this.repository.save(adotande);
    return criarAdotante
      ? {
          adotanteBody: criarAdotante,
          success: true,
          message: this.messageTrue,
        }
      : { message: this.messageFalse, success: false };
  }
  async atualizarAdotante(
    id: number,
    adotande: AdotanteEntity
  ): Promise<{
    success: boolean;
    message?: string;
    adotanteAtualizado?: AdotanteEntity;
  }> {
    const adotanteToUpdate = await this.repository.findOne({ where: { id } });
    if (!adotanteToUpdate) {
      return {
        success: false,
        message: `${this.messageFalse} - Adotante não encontrado!`,
      };
    }
    Object.assign(adotanteToUpdate, adotande);
    const response = await this.repository.save(adotanteToUpdate);
    return {
      success: true,
      message: this.messageTrue,
      adotanteAtualizado: response,
    };
  }

  async deletarAdotante(
    id: number
  ): Promise<{ success: boolean; message?: string }> {
    const adotanteToDelete = await this.repository.findOne({ where: { id } });
    if (!adotanteToDelete)
      return { success: false, message: "Adotante não encontrado!" };
    await this.repository.remove(adotanteToDelete);
    return { success: true, message: "Adotante deletado com sucesso!" };
  }
}

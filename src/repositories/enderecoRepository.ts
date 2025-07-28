import { Repository } from "typeorm";
import EnderecoEntity from "../entities/enderecoEntity";
import InterfaceEndereco from "./interfaces/interfaceEndereco";

export default class EnderecoRepository implements InterfaceEndereco {
  private repository: Repository<EnderecoEntity>;
  constructor(repository: Repository<EnderecoEntity>) {
    this.repository = repository;
  }
  async listarEndereco(): Promise<Array<EnderecoEntity>> {
    return await this.repository.find();
  }
  async criarEndereco(
    endereco: EnderecoEntity
  ): Promise<{ success: boolean; message?: string }> {
    const newAddress = await this.repository.save(endereco);
    if (!newAddress)
      return { success: false, message: "Falha ao cadastrar o endereço!" };
    return { success: true, message: "Endereço cadastrado com sucesso!" };
  }
  async atualizarEndereco(
    id: number,
    endereco: EnderecoEntity
  ): Promise<{
    success: boolean;
    message?: string;
    addressUpdate?: EnderecoEntity;
  }> {
    const addressUpdate = await this.repository.findOne({ where: { id } });
    if (!addressUpdate)
      return { success: false, message: "Endereço não encontrado!" };
    Object.assign(addressUpdate, endereco);
    await this.repository.save(addressUpdate);
    return {
      success: true,
      message: "Endereço atualizado com sucesso!",
      addressUpdate: addressUpdate,
    };
  }

  async deletarEndereco(
    id: number
  ): Promise<{ success: boolean; message?: string }> {
    const addressDelet = await this.repository.findOne({ where: { id } });
    if (!addressDelet)
      return { success: false, message: "Endereço não encontrado!" };
    await this.repository.remove(addressDelet);
    return { success: true, message: "Endereço deetado com sucesso!" };
  }
}

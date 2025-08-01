import { Repository } from "typeorm";
import EnderecoEntity from "../entities/enderecoEntity";
import InterfaceEndereco from "./interfaces/interfaceEndereco";
import AdotanteEntity from "../entities/adotanteEntity";

export default class EnderecoRepository implements InterfaceEndereco {
  private enderecoRepository: Repository<EnderecoEntity>;
  private adotanteRepository: Repository<AdotanteEntity>;
  private messageFalse: string;
  private messageTrue: string;
  constructor(
    enderecoRepository: Repository<EnderecoEntity>,
    adotanteRepository: Repository<AdotanteEntity>
  ) {
    this.enderecoRepository = enderecoRepository;
    this.adotanteRepository = adotanteRepository;
    this.messageFalse = "Falha na requisição";
    this.messageTrue = "Requisção realizada com sucesso";
  }
  async listarEndereco(): Promise<Array<EnderecoEntity>> {
    return await this.enderecoRepository.find();
  }
  async atualizarEndereco(
    id: number,
    endereco: EnderecoEntity
  ): Promise<{
    success: boolean;
    message?: string;
    enderecoAtualizado?: EnderecoEntity;
  }> {
    const enderecoPorId = await this.enderecoRepository.findOne({
      where: { id },
    });
    if (!enderecoPorId) {
      return {
        success: false,
        message: `${this.messageFalse} - Adotante não encontrado!`,
      };
    }
    Object.assign(enderecoPorId, endereco);
    const responde = await this.enderecoRepository.save(enderecoPorId);
    return {
      success: true,
      message: this.messageTrue,
      enderecoAtualizado: responde,
    };
  }
  async criarEnderecoParaAdotante(
    endereoData: EnderecoEntity & { idAdotante: number }
  ): Promise<{
    success: boolean;
    message?: string;
    enderecoCriado?: EnderecoEntity;
  }> {
    const { idAdotante, ...endereoInfo } = endereoData;
    const adotante = await this.adotanteRepository.findOne({
      where: { id: idAdotante },
      relations: ["address"],
    });
    if (!adotante)
      return {
        success: false,
        message: `${this.messageFalse} - Adotante não encontrado`,
      };
    if (adotante.address)
      return {
        success: false,
        message: `${this.messageFalse} - Adotante ja possui endereço cadastrado`,
      };
    const newAddress = this.enderecoRepository.create(endereoInfo);
    adotante.address = newAddress;
    await this.adotanteRepository.save(adotante);
    return {
      success: true,
      message: this.messageTrue,
      enderecoCriado: newAddress,
    };
  }

  async deletarEndereco(
    id: number
  ): Promise<{ success: boolean; message?: string }> {
    const addressDelet = await this.enderecoRepository.findOne({
      where: { id },
    });
    if (!addressDelet)
      return { success: false, message: "Endereço não encontrado!" };
    await this.enderecoRepository.remove(addressDelet);
    return { success: true, message: "Endereço deetado com sucesso!" };
  }
}

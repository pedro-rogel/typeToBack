import EnderecoEntity from "../../entities/enderecoEntity";

export default interface InterfaceEndereco {
  listarEndereco():
    | Promise<Array<EnderecoEntity>>
    | Array<EnderecoEntity>;
  criarEndereco(
    endereco: EnderecoEntity
  ): Promise<{ success: boolean; message?: string } | void> | void;
  atualizarEndereco(
    id: number,
    endereco: EnderecoEntity
  ): Promise<{ success: boolean; message?: string }>;

  deletarEndereco(id: number): Promise<{ success: boolean; message?: string }>;
}

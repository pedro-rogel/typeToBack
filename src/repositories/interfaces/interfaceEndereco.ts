import EnderecoEntity from "../../entities/enderecoEntity";

export default interface InterfaceEndereco {
  listarEndereco():
    | Promise<Array<EnderecoEntity>>
    | Array<EnderecoEntity>;
  criarEnderecoParaAdotante(
    endereco: EnderecoEntity & {idAdotante:number}
  ): Promise<{ success: boolean; message?: string; enderecoCriado?:EnderecoEntity}>;
 
  atualizarEndereco(
    id: number,
    endereco: EnderecoEntity
  ): Promise<{ success: boolean; message?: string }>;

  deletarEndereco(id: number): Promise<{ success: boolean; message?: string }>;
}

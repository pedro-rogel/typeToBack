import AdotanteEntity from "../../entities/adotanteEntity";

export default interface InterfaceAdotande {
  listarAdotande(): Promise<{
    listadePet?: Array<AdotanteEntity>;
    success: boolean;
    message?: string;
  }>;
  adotandePorId(id: number):
    | Promise<{
        adotantePorId?: AdotanteEntity | null;
        success: boolean;
        message?: string;
      }>
    | AdotanteEntity;
  criarAdotante(
    adotande: AdotanteEntity
  ): Promise<{
    adotanteBody?: AdotanteEntity;
    success: boolean;
    message?: string;
  }>;
  atualizarAdotante(
    id: number,
    adotande: AdotanteEntity
  ): Promise<{ success: boolean; message?: string }> | void;
  deletarAdotante(id: number): Promise<{ success: boolean; message?: string }>;
}

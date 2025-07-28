import PetEntity from "../../entities/petEntity";

export default interface InterfacePet {
  listarPet():
    | Promise<Array<PetEntity> | { success: boolean; message?: string }>
    | Array<PetEntity | { success: boolean; message?: string }>;
  petPorId(id: number): Promise<{
    petPrId?: PetEntity | null;
    success: boolean;
    message?: string;
  }>;
  criarPet(pet: PetEntity): Promise<{
    success: boolean;
    message?: string;
    petBody?: PetEntity;
  }>;
  atualizaPet(
    id: number,
    pet: PetEntity
  ): Promise<{
    success: boolean;
    message?: string;
    petAtualizado?: PetEntity | null;
  }> | void;
  deletePet(
    id: number,
    pet: PetEntity
  ): Promise<{ success: boolean; message?: string }> | void;
  queryParams(
    adotado: boolean
  ): Promise<{ success: boolean; message?: string } | void>;
}

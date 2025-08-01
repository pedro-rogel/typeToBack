import PetEntity from "../../entities/petEntity";
import EnumPorte from "../../models/enumPorte";

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
  ): Promise<{ success: boolean; message?: string }>;
  queryAdotado(
    adotado: boolean
  ): Promise<{ success: boolean; message?: string }>;

  adotaPet(
    idPet: number,
    idAdotante: number
  ): Promise<{ success: boolean; message?: string }>;

  queryPetByPorte(porte: EnumPorte): Promise<{
    success: boolean;
    message?: string;
    petByPote?: Array<PetEntity>;
  }>;

  queryPetByAnyField<T extends keyof PetEntity>(
    field: T,
    value: PetEntity[T]
  ): Promise<{
    success: boolean;
    message?: string;
    petByAnyField?: Array<PetEntity>;
  }>;
}

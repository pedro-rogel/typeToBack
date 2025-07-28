import PetEntity from "../../entities/petEntity";

export default interface InterfacePet {
  listarPet(): Promise<Array<PetEntity>> | Array<PetEntity>;
  petPorId(id: number): Promise<PetEntity | null> 
  criarPet(pet: PetEntity): Promise<void>;
  atualizaPet(
    id: number,
    pet: PetEntity
  ): Promise<{ success: boolean; message?: string }> | void;
  deletePet(
    id: number,
    pet: PetEntity
  ): Promise<{ success: boolean; message?: string }> | void;
  queryParams(adotado: boolean): Promise<{ success: boolean; message?: string } | void>;
}

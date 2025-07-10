import PetEntity from "../../entities/petEntity";

export default interface InterfacePet {
  listarPet(): Array<PetEntity>;
  petPorId(id: number): void;
  criarPet(pet: PetEntity): void;
  atualizaPet(id:number,pet: PetEntity): void;
  deletePet(id:number,pet: PetEntity): void;
}

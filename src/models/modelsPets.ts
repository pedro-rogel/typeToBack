import EnumEspecie from "./enumEspecie";

interface PetsModel {
  id: number;
  nome: string;
  especie: EnumEspecie;
  dataNascimento: string;
  adotado: boolean;
}

export default PetsModel;

// function criaPet(
//   id: number,
//   nome: string,
//   especie: string,
//   idade: number,
//   adotado: boolean
// ) {
//   return {
//     id,
//     nome,
//     especie,
//     idade,
//     adotado,
//   };
// }

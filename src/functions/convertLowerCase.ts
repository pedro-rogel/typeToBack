import EnumEspecie from "../models/enumEspecie";

function convertLowerCase(string: string): EnumEspecie | undefined {
  // para deixar a especie em lowerCase
  const lowerCase = string.toLocaleLowerCase();
  if (
    Object.values(EnumEspecie).includes(<EnumEspecie>lowerCase.toLowerCase())
  ) {
    return <EnumEspecie>lowerCase;
  }
  throw Error("Especie precisa ser 'cachorro' ou 'gato'");
}
export default convertLowerCase;

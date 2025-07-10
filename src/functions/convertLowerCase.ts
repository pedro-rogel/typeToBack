import EnumEspecie from "../models/enumEspecie";

function convertLowerCase(string: string): EnumEspecie | undefined {
  const lowerCase = string.toLocaleLowerCase();
  if (Object.values(EnumEspecie).includes(<EnumEspecie>lowerCase)) {
    return <EnumEspecie>lowerCase;
  }
  throw Error("Especie precisa ser 'cachorro' ou 'gato'");
}

export default convertLowerCase
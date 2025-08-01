import EnumEspecie from "../models/enumEspecie";
import EnumPorte from "../models/enumPorte";

function convertLowerCase<T extends Record<string, string>>(
  string: string,
  type: T
): T[keyof T] {
  // para deixar a especie em lowerCase
  const normalizedValue = string.toLocaleLowerCase();
  const validValues = Object.values(type).map((v) => v.toLocaleLowerCase());
  if (!validValues.includes(normalizedValue))
    throw Error(`Valor inválido. Valores aceitos: ${validValues.join(", ")}`);
  return type[
    Object.keys(type).find(
      (key) => type[key].toLocaleLowerCase() === normalizedValue
    ) as keyof T
  ];
}
export default convertLowerCase;

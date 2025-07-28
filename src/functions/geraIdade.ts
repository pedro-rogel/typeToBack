const geraIdade = (data: string) => {
  const currentDate = new Date();
  const formatDate = currentDate.toLocaleDateString().split("/");
  const [currentDay, currentMonth, currentYear] = formatDate;
  const [diatInput, monthInput, yearInput] = data.split("/");

  if (yearInput.length !== 4)
    // condição para ver se a data está no formato correto
    throw Error("Formato de data inválido, passe no formato 'DD/MM/YYYY'!");

  if (Number(yearInput) > Number(currentYear)) {
    // condição para ver se o ano que foi passado é maior do que o ano atual
    throw Error(
      "Passe uma data válida, não tem como o ano que foi passado ser maior do que o ano atual"
    );
  }

  if (Number(monthInput) > Number(currentMonth)) {
    // condição para ver se o mes é maior do que o mes atual, se for igual o mes atual, verifica se o dia é maior do que o dia atual
    if (Number(diatInput) > Number(currentDay))
      throw Error("Passe uma data válida");
  }

  return String(Number(currentYear) - Number(yearInput));
};

export default geraIdade;

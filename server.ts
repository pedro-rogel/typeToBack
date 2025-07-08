import app from "./src/app.ts";

const PORTA = 3000;

app.listen(PORTA, () => {
  console.log(`Servidor executando em http://localhost:${PORTA}`);
});
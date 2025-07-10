import { DataSource } from "typeorm";
import PetEntity from "../entities/petEntity";

export const AppDataSource = new DataSource({
  type: "sqlite", // selecionando qual será o meu banco de dados
  database: "./src/config/database.sqlite", // selecionando onde irei guardar o meu arquivo database
  entities: [PetEntity], // para minhas entidades, ele ja criara tabelas
  synchronize: true, // sincronização dos meus dadoss
});

import { DataSource } from "typeorm";
import PetEntity from "../entities/petEntity";
import AdotanteEntity from "../entities/adotanteEntity";
import EnderecoEntity from "../entities/enderecoEntity";

export const AppDataSource = new DataSource({
  type: "sqlite", // selecionando qual será o meu banco de dados
  database: "./src/config/database.sqlite", // selecionando onde irei guardar o meu arquivo database
  entities: [PetEntity, AdotanteEntity, EnderecoEntity], // para minhas entidades, ele ja criara tabelas
  synchronize: true, // sincronização dos meus dadoss
  
});

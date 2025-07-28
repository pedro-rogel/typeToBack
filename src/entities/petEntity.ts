import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import EnumEspecie from "../models/enumEspecie";

@Entity()
export default class PetEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome: string;

  @Column({ type: "varchar", enum: EnumEspecie })
  especie: EnumEspecie | undefined;

  @Column()
  idade: string;

  @Column()
  adotado: boolean;

  constructor(
    nome: string,
    especie: EnumEspecie | undefined,
    idade: string,
    adotado: boolean
  ) {
    this.nome = nome;
    this.especie = especie;
    this.idade = idade;
    this.adotado = adotado;
  }
}

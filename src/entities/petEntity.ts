import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import EnumEspecie from "../models/enumEspecie";

@Entity()
export default class PetEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome: string;

  @Column({ type: "varchar", enum: EnumEspecie })
  especie: EnumEspecie;

  @Column()
  dataNascimento: string;

  @Column()
  adotado: boolean;

  constructor(
    nome: string,
    especie: EnumEspecie,
    dataNascimento: string,
    adotado: boolean
  ) {
    this.nome = nome;
    this.especie = especie;
    this.dataNascimento = dataNascimento;
    this.adotado = adotado;
  }
}

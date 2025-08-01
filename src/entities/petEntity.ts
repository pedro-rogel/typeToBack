import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import EnumEspecie from "../models/enumEspecie";
import AdotanteEntity from "./adotanteEntity";
import EnumPorte from "../models/enumPorte";

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

  @Column({type: "varchar", enum:EnumPorte, nullable:true})
  porte?: EnumPorte | undefined

  @ManyToOne(() => AdotanteEntity, (adotante) => adotante.pets,{nullable:true} )
  @JoinColumn({ name: "adotante_id" })
  adotante!: AdotanteEntity | null;

  constructor(
    nome: string,
    especie: EnumEspecie | undefined,
    idade: string,
    adotado: boolean,
    porte?: EnumPorte | undefined,
  ) {
    this.nome = nome;
    this.especie = especie;
    this.idade = idade;
    this.adotado = adotado;
    this.porte = porte
  }
}

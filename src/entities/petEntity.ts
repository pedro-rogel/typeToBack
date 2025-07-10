import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import EnumEspecie from "../models/enumEspecie";

@Entity()
export default class PetEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({type: "varchar", enum: EnumEspecie})
  especie: "cachorro" | "gato"
  

  @Column()
  dataNascimento: string;

  @Column()
  adotado: boolean;
}

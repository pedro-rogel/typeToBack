import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import EnderecoEntity from "./enderecoEntity";
import PetEntity from "./petEntity";
import { Exclude } from "class-transformer";

@Entity()
export default class AdotanteEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  photo?: string;

  @OneToOne(() => EnderecoEntity, {
    nullable: true,
    cascade: true,
    eager: true,
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "address_id" })
  @Exclude({toPlainOnly:true})
  address?: EnderecoEntity;

  @OneToMany(() => PetEntity, (pet) => pet.adotante, {
    nullable: true, //Isso significa que permitimos que esse campo seja
    cascade: true, //qualquer ação que ocorrer com o adotante, também ocorra com o pet.
    eager: true, // quando listamos, por exemplo, um qdotante, não precisamos procurar o relacionamento que ele tem com o endereço. Por ser do tipo eager, ou seja, "guloso", ele listará não apenas o adotante, mas também o endereço.
    onDelete: "SET NULL",
  })
  @Exclude({toPlainOnly:true})
  pets!: PetEntity[];

  constructor(
    name: string,
    password: string,
    phone: string,
    photo?: string,
    address?: EnderecoEntity
  ) {
    this.name = name;
    this.password = password;
    this.phone = phone;
    this.photo = photo;
    this.address = address;
  }
}

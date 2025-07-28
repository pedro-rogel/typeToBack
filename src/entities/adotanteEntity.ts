import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

  @Column()
  photo: string;

  @Column()
  address: string;

  constructor(
    name: string,
    password: string,
    phone: string,
    photo: string,
    address: string
  ) {
    this.name = name;
    this.password = password;
    this.phone = phone;
    this.photo = photo;
    this.address = address;
  }
}

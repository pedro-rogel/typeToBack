import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class EnderecoEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  street: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  neighborhood: string;

  @Column()
  number: number;

  @Column()
  zip: string;

  constructor(
    street: string,
    city: string,
    state: string,
    neighborhood: string,
    number: number,
    zip: string
  ) {
    this.street = street;
    this.city = city;
    this.state = state;
    this.neighborhood = neighborhood;
    this.number = number;
    this.zip = zip;
  }
}

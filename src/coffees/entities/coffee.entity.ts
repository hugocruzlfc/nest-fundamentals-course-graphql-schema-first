import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  ManyToMany,
  CreateDateColumn,
} from 'typeorm';
import * as GraphQLTypes from '../../graphql-types';
import { Flavor } from './flavor.entity';

@Entity()
export class Coffee implements GraphQLTypes.Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @JoinTable()
  @ManyToMany((type) => Flavor, (flavor) => flavor.coffees, {
    cascade: true,
  })
  flavors?: Flavor[];

  @CreateDateColumn()
  createdAt?: Date | null;

  @Column({ nullable: true })
  type: GraphQLTypes.CoffeeType;
}

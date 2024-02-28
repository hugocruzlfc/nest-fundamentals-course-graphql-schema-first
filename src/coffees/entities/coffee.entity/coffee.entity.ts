import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import * as GraphQLTypes from '../../../graphql-types';

@Entity()
export class Coffee implements GraphQLTypes.Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column({ type: 'json' })
  flavors: string[];
}

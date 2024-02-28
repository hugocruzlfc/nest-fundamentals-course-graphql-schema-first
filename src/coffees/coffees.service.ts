import { Injectable } from '@nestjs/common';
import * as GraphQLTypes from '../graphql-types';
import { InjectRepository } from '@nestjs/typeorm';
import { Coffee } from './entities';
import { Repository } from 'typeorm';
import { UserInputError } from 'apollo-server-express';
import * as GraphqlTypes from '../graphql-types';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeesRepository: Repository<Coffee>,
  ) {}

  async findAll() {
    return this.coffeesRepository.find();
  }

  async findOne(id: number): Promise<Coffee> {
    const coffee = await this.coffeesRepository.findOne({ where: { id } });
    if (!coffee) {
      // ⚠️ If you use the latest version of Apollo (>= v4), import "UserInputError" from "@nestjs/graphql"
      // Users that still depend on Apollo v3 can import this class from the "apollo-server-express" package
      throw new UserInputError(`Coffee #${id} does not exist`);
    }
    return coffee;
  }

  async create(
    createCoffeeInput: GraphqlTypes.CreateCoffeeInput,
  ): Promise<Coffee> {
    const coffee = this.coffeesRepository.create(createCoffeeInput);
    return this.coffeesRepository.save(coffee);
  }

  async update(
    id: number,
    updateCoffeeInput: GraphQLTypes.UpdateCoffeeInput,
  ): Promise<GraphQLTypes.Coffee> {
    const coffee = await this.coffeesRepository.preload({
      id,
      ...updateCoffeeInput,
    });
    if (!coffee) {
      throw new UserInputError(`Coffee #${id} does not exist`);
    }
    return this.coffeesRepository.save(coffee);
  }

  async remove(id: number): Promise<GraphQLTypes.Coffee> {
    const coffee = await this.findOne(id);
    return this.coffeesRepository.remove(coffee);
  }
}

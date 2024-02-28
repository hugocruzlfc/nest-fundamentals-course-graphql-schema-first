import { ParseIntPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import * as GraphQLTypes from '../graphql-types';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeInput, UpdateCoffeeInput } from './dtos';

@Resolver()
export class CoffeesResolver {
  constructor(private readonly coffeeService: CoffeesService) {}

  @Query('coffees')
  async findAll(): Promise<GraphQLTypes.Coffee[]> {
    return this.coffeeService.findAll();
  }

  @Query('coffee')
  async findOne(
    @Args('id', ParseIntPipe) id: number,
  ): Promise<GraphQLTypes.Coffee> {
    return this.coffeeService.findOne(id);
  }

  @Mutation('createCoffee') // notice we're decoupled the name from the actual GQL mutation name 'createCoffee'
  async create(
    @Args('createCoffeeInput')
    createCoffeeInput: CreateCoffeeInput,
  ): Promise<GraphQLTypes.Coffee> {
    return this.coffeeService.create(createCoffeeInput);
  }

  @Mutation('updateCoffee')
  async update(
    @Args('id', ParseIntPipe) id: number,
    @Args('updateCoffeeInput')
    updateCoffeeInput: UpdateCoffeeInput,
  ): Promise<GraphQLTypes.Coffee> {
    return this.coffeeService.update(id, updateCoffeeInput);
  }

  @Mutation('removeCoffee')
  async remove(
    @Args('id', ParseIntPipe) id: number,
  ): Promise<GraphQLTypes.Coffee> {
    return this.coffeeService.remove(id);
  }
}

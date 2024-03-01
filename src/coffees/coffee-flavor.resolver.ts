import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Coffee, Flavor } from './entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FlavorsByCoffeeLoader } from './data-loader';

@Resolver('Coffee')
export class CoffeeFlavorResolver {
  // constructor(
  //   // ⚙️ Inject the Flavor Repository
  //   @InjectRepository(Flavor)
  //   private readonly flavorsRepository: Repository<Flavor>,
  // ) {}

  // @ResolveField('flavors')
  // async getFlavorsOfCoffee(@Parent() coffee: Coffee) {
  //   return this.flavorsRepository
  //     .createQueryBuilder('flavor')
  //     .innerJoin('flavor.coffees', 'coffees', 'coffees.id = :coffeeId', {
  //       coffeeId: coffee.id,
  //     })
  //     .getMany();
  // }

  constructor(
    private readonly flavorsByCoffeeLoader: FlavorsByCoffeeLoader, // 👈 utilize our new loader
  ) {}

  @ResolveField('flavors')
  async getFlavorsOfCoffee(@Parent() coffee: Coffee) {
    return this.flavorsByCoffeeLoader.load(coffee.id); // 👈
  }
}

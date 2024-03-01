import { Module } from '@nestjs/common';
import { CoffeesResolver } from './coffees.resolver';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee, Flavor } from './entities';
import { CoffeeFlavorResolver } from './coffee-flavor.resolver';
import { DrinksResolver } from './drinks.resolver';
import { PubSubModule } from '../pub-sub/pub-sub.module';
import { FlavorsByCoffeeLoader } from './data-loader/flavors-by-coffee.loader/flavors-by-coffee.loader';

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor]), PubSubModule],
  providers: [
    CoffeesResolver,
    CoffeesService,
    CoffeeFlavorResolver,
    DrinksResolver,
    FlavorsByCoffeeLoader,
  ],
})
export class CoffeesModule {}

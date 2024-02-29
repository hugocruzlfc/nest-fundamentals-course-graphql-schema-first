import { Module } from '@nestjs/common';
import { CoffeesResolver } from './coffees.resolver';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee, Flavor } from './entities';
import { CoffeeFlavorResolver } from './coffee-flavor.resolver';
import { DrinksResolver } from './drinks.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor])],
  providers: [
    CoffeesResolver,
    CoffeesService,
    CoffeeFlavorResolver,
    DrinksResolver,
  ],
})
export class CoffeesModule {}

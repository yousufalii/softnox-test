import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dish } from './entity/dish.entity';
import { DishProvider } from './dish.provider';
import { DishRepository } from './repository/dish.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Dish])],
  controllers: [],
  providers: [DishRepository, DishProvider],
  exports: [DishProvider],
})
export class DishModule {}

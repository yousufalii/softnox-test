import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dish } from './entity/dish.entity';
import { DishProvider } from './dish.provider';
import { DishRepository } from './repository/dish.repository';
import { DishController } from './dish.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Dish])],
  controllers: [DishController],
  providers: [DishRepository, DishProvider],
  exports: [DishProvider],
})
export class DishModule {}

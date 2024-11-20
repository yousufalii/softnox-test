import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { OrderController } from './order.controller';
import { OrderProvider } from './order.provider';
import { OrderRepository } from './repository/order.respository';
import { DishProvider } from 'src/dish/dish.provider';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), DishProvider],
  controllers: [OrderController],
  providers: [OrderProvider, OrderRepository],
  exports: [],
})
export class OrderModule {}

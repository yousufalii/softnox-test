import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { OrderController } from './order.controller';
import { OrderProvider } from './order.provider';
import { OrderRepository } from './repository/order.respository';
import { DishModule } from 'src/dish/dish.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), DishModule],
  controllers: [OrderController],
  providers: [OrderProvider, OrderRepository],
  exports: [],
})
export class OrderModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { OrderController } from './order.controller';
import { OrderProvider } from './order.provider';
import { OrderRepository } from './repository/order.respository';
import { DishModule } from 'src/dish/dish.module';
import { KafkaConsumerModule } from 'src/kafka/kafka-consumer.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), DishModule, KafkaConsumerModule],
  controllers: [OrderController],
  providers: [OrderProvider, OrderRepository],
  exports: [],
})
export class OrderModule {}

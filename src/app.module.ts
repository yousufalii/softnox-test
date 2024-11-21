import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigAsync } from './config/typeOrm.config';
import { UserModule } from './user/user.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { OrderModule } from './order/order.module';
import { DeliveryModule } from './delivery/delivery.module';
import { DishModule } from './dish/dish.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaConsumerModule } from './kafka/kafka-consumer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    UserModule,
    RestaurantModule,
    DishModule,
    OrderModule,
    DeliveryModule,
    KafkaConsumerModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }

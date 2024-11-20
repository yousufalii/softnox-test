import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Delivery } from './entity/delivery.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Delivery])],
  controllers: [],
  providers: [],
  exports: [],
})
export class DeliveryModule {}

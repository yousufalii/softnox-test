import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Delivery } from './entity/delivery.entity';
import { DeliveryController } from './delivery.controller';
import { DeliveryProvider } from './delivery.provider';
import { DeliveryRepository } from './repository/delivery.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Delivery])],
  controllers: [DeliveryController],
  providers: [DeliveryProvider, DeliveryRepository],
  exports: [],
})
export class DeliveryModule {}

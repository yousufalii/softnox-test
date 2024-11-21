import {
    Controller,
    Get,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DeliveryProvider } from './delivery.provider';

@ApiTags('delivery')
@Controller('delivery')
export class DeliveryController {
    constructor(private readonly deliveryProvider: DeliveryProvider) { }

    @Get('/analytics/delivery-time')
    async getOrdersAverageDeliveryTime() {
      return await this.deliveryProvider.getOrdersAverageDeliveryTime();
    }
}

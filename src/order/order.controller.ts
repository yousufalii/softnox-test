import {
    Body,
    Controller,
    Post,
    UseGuards,  
    Request,
    Get,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { OrderProvider } from './order.provider';
import { CreateOrderDto } from './dto/createOrder.dto';

@ApiTags('order')
@Controller('order')
export class OrderController {
    constructor(private readonly orderProvider: OrderProvider) { }

    @Post()
    async createOrder(@Request() req, @Body() order: CreateOrderDto) {
      const newOrder = await this.orderProvider.createOrder({ ...order });
      return newOrder;
    }

    @Get()
    async getActiveOrders(@Request() req) {
      const newOrder = await this.orderProvider.createOrder({ ...order });
      return newOrder;
    }
}

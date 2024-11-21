import { Injectable } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Injectable()
export class KafkaConsumerService {

  @MessagePattern('order.created')
  async handleOrderCreated(@Payload() message: any) {
    console.log('Received new order event:', message);
  }

  @MessagePattern('delivery.created')
  async handleDeliveryCreated(@Payload() message: any) {
    console.log('Received new delivery event:', message);
  }

  @MessagePattern('order.updated')
  async handleOrderUpdated(@Payload() message: any) {
    console.log('Received order update event:', message);
  }
}

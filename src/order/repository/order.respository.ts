import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Order } from '../entity/order.entity';
import { ICreateOrder } from '../interface/order.interface';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>
  ) {}

  async createOrder(order: ICreateOrder) {
    const createdOrder = this.orderRepository.create(order)
    return this.orderRepository.save(createdOrder);
  }
}

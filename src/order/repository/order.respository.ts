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
  ) { }

  async createOrder(order: ICreateOrder) {
    const createdOrder = this.orderRepository.create(order)
    return this.orderRepository.save(createdOrder);
  }

  async getActiveOrIncompleteOrders() {
    return await this.orderRepository.createQueryBuilder('order')
      .where(
        `order.status IN ('1', '3') AND TIMESTAMPDIFF(MINUTE, order.order_time, NOW()) > 30`
      )
      .getMany();
  }
}

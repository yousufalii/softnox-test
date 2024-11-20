import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { OrderRepository } from './repository/order.respository';
import { CreateOrderDto } from './dto/createOrder.dto';
import { DishProvider } from 'src/dish/dish.provider';

@Injectable()
export class OrderProvider {
    constructor(
        private readonly orderRepository: OrderRepository,
        private readonly dishProvider: DishProvider,
    ) { }

    async createOrder(order: CreateOrderDto) {
        try {
            const dish = await this.dishProvider.getDishPreparationTimeAndPrice(order.dishId);
            return await this.orderRepository.createOrder({ ...order, totalCost: dish.price, orderTime: dish.preparationTime });
        } catch (error) {
            throw new BadRequestException(
                'Something went wrong while creating order',
                error
            );
        }
    }
}

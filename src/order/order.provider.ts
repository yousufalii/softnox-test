import {
    BadRequestException,
    Inject,
    Injectable,
} from '@nestjs/common';
import { OrderRepository } from './repository/order.respository';
import { CreateOrderDto } from './dto/createOrder.dto';
import { DishProvider } from 'src/dish/dish.provider';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class OrderProvider {
    constructor(
        private readonly orderRepository: OrderRepository,
        private readonly dishProvider: DishProvider,
        @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka, 
    ) { }

    async createOrder(order: CreateOrderDto) {
        try {
            const dish = await this.dishProvider.getDishPreparationTimeAndPrice(order.dishId);

            const createdOrder = await this.orderRepository.createOrder({
                ...order,
                totalCost: dish.price,
                orderTime: dish.preparationTime,
            });

            this.publishOrderCreatedEvent(createdOrder);

            return createdOrder;
        } catch (error) {
            throw new BadRequestException(
                'Something went wrong while creating order',
                error
            );
        }
    }

    async getActiveOrIncompleteOrders() {
        try {
            return await this.orderRepository.getActiveOrIncompleteOrders()
        } catch (error) {
            throw new BadRequestException(
                'Something went wrong while creating order',
                error
            );
        }
    }

    private async publishOrderCreatedEvent(order) {
        const message = {
            orderId: order.id,
            dishId: order.dishId,
            totalCost: order.totalCost,
            orderTime: order.orderTime,
            createdAt: order.createdAt,
        };

        await this.kafkaClient.emit('order.created', message);
    }
}

import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { DeliveryRepository } from './repository/delivery.repository';

@Injectable()
export class DeliveryProvider {
    constructor(
        private readonly deliveryRepository: DeliveryRepository,
    ) { }

    async getOrdersAverageDeliveryTime() {
        try {
            return await this.deliveryRepository.getOrdersAverageDeliveryTime()
        } catch (error) {
            throw new BadRequestException(
                'Something went wrong while creating order',
                error
            );
        }
    }
}

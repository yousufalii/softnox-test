import {
    BadRequestException,
    Injectable,
} from '@nestjs/common';
import { DishRepository } from './repository/dish.repository';

@Injectable()
export class DishProvider {
    constructor(
        private readonly dishRepository: DishRepository,
    ) { }

    async getDishPreparationTimeAndPrice(dishId: number) {
        try {
            return await this.dishRepository.getDishPreparationTimeAndPrice(dishId);
        } catch (error) {
            throw new BadRequestException(
                'Something went wrong while getting dish preparation time and price',
                error
            );
        }
    }
}

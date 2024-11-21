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

    async getDishPreparationTimeAndPrice(dishId: number): Promise<{ price: number, preparationTime: number }> {
        const dish = await this.dishRepository.getDishPreparationTimeAndPrice(dishId);
        return {
            price: dish.price,
            preparationTime: dish.preparationTime,
        };
    }

    async getPopularDishes(restaurantId: number) {
        const dish = await this.dishRepository.getDishesByPopularityScore(restaurantId);
        return dish
    }
}

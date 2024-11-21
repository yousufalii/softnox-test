import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Dish } from '../entity/dish.entity';

@Injectable()
export class DishRepository {
  constructor(
    @InjectRepository(Dish)
    private dishRepository: Repository<Dish>
  ) { }

  async getDishPreparationTimeAndPrice(id: number): Promise<{ price: number, preparationTime: number }> {
    const dish = await this.dishRepository.findOne({ where: { id } });
    return {
      price: dish.price,
      preparationTime: dish.preparationTime,
    };
  }

  async getDishesByPopularityScore(restaurantId: number) {
    return this.dishRepository.createQueryBuilder('dish')
      .where('dish.restaurant_id = :restaurantId', { restaurantId })  
      .orderBy('dish.popularity_score', 'DESC') 
      .getMany();  
  }
}

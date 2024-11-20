import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Dish } from '../entity/dish.entity';

@Injectable()
export class DishRepository {
  constructor(
    @InjectRepository(Dish)
    private dishRepository: Repository<Dish>
  ) {}

  async getDishPreparationTimeAndPrice(id: number) {
    // return this.dishRepository.findOne(createdOrder);
  }
}

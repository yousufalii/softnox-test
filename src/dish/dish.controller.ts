import {
    Body,
    Controller,
    Post,
    UseGuards,
    Request,
    Get,
    Param,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { DishProvider } from './dish.provider';

@ApiTags('dish')
@Controller('dish')
export class DishController {
    constructor(private readonly dishProvider: DishProvider) { }

    @Get('/analytics/popular-dishes/:id')
    async getPopularDishes(
      @Param('id') restaurantId: number,  
    ) {
      return await this.dishProvider.getPopularDishes(restaurantId);
    }
}

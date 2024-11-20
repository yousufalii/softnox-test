import {
    Body,
    Controller,
    Post,
    UseGuards,  
    Request,
    Get,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
// import { DishProvider } from './dish.provider';

@ApiTags('dish')
@Controller('dish')
export class OrderController {
    constructor(private readonly dishProvider) { }

    // get average delivery time

    // @Get('/analytics/popular-dishes')
    // async getPopularDishes() {
    //   const newOrder = await this.dishProvider.getPopularDishes();
    //   return newOrder;
    // }
}

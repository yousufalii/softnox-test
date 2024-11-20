import {
    Controller,
    Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('restaurants')
@Controller('restaurants')
export class RestaurantController {
    constructor() { }

    @Post()
    async createUser() {
        return `New user created`;
    }
}

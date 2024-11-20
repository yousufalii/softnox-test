import {
    Controller,
    Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
    constructor() { }

    @Post()
    async loginUser() {
        return `New user created`;
    }
}

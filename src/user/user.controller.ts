import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
// import { LoginDto } from './dto/login.dto';
// import { User } from '../user/entity/user.entity';
// import { LocalAuthGuard } from 'src/core/localAuth.guard';

@ApiTags('auth')
@Controller('auth')
export class UserController {
  // constructor(private readonly authProvider: userProvider) {}

  // @ApiBody({ type: LoginDto })
  // @Post('login')
  // @UseGuards(LocalAuthGuard)
  // async login(@Request() req: { user: User }): Promise<{ data: IUserLogin }> {
  //   const data = await this.authProvider.login(req.user);
  //   return { data };
  // }
}
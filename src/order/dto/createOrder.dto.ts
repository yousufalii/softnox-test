import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @ApiProperty()
  restaurantId: number;

  @IsNotEmpty()
  @ApiProperty()
  dishId: number;

  @IsNotEmpty()
  @ApiProperty()
  userId: number;
}

import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Food Delivery System')
  .setDescription('Food Delivery System')
  .setVersion('1.0')
  .addTag('API')
  .build();

import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Delivery } from '../entity/delivery.entity';
import { Order } from 'src/order/entity/order.entity';

@Injectable()
export class DeliveryRepository {
  constructor(
    @InjectRepository(Delivery)
    private deliveryRepository: Repository<Delivery>
  ) { }

  async getOrdersAverageDeliveryTime() {
    const queryBuilder = this.deliveryRepository
      .createQueryBuilder("d")  
      .select([
        "YEAR(o.order_time) AS year",  
        "WEEK(o.order_time) AS week", 
        "AVG(TIMESTAMPDIFF(SECOND, o.order_time, d.delivery_time)) / 60 AS avg_delivery_time_minutes_weekly"  
      ])
      .innerJoin(Order, "o", "o.delivery_id = d.id")  
      .where("o.status = :status", { status: "3" }) 
      .groupBy("YEAR(o.order_time), WEEK(o.order_time)")  
      .orderBy("year", "DESC") 
      .addOrderBy("week", "DESC"); 

    const result = await queryBuilder.getRawMany();

    return result;
  }
}

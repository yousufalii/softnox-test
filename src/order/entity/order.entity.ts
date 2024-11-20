import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Restaurant } from '../../restaurant/entity/restaurant.entity';
import { User } from '../../user/entity/user.entity';
import { Delivery } from 'src/delivery/entity/delivery.entity';
import { Dish } from 'src/dish/entity/dish.entity';

export enum OrderStatus {
    PENDING = 1,
    IN_PROGRESS = 2,
    COMPLETED = 3,
}

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'total_cost', type: 'varchar', length: 255 })
    totalCost: number;

    @Column({ name: 'order_time', type: 'timestamp' })
    orderTime: number;

    @Column({ name: 'status', type: 'enum', enum: OrderStatus })
    status: OrderStatus;

    @CreateDateColumn({ name: 'createdAt', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updatedAt', type: 'timestamp' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deletedAt', type: 'timestamp', nullable: true })
    deletedAt: Date;

    @ManyToOne(() => Restaurant, (restaurant) => restaurant.orders)
    @JoinColumn({ name: 'restaurant_id' })
    restaurant: Restaurant;

    @ManyToOne(() => User, (user) => user.orders)
    @JoinColumn({ name: 'user_id' }) 
    user: User;

    @OneToOne(() => Dish, (dish) => dish.order)
    @JoinColumn({ name: 'dish_id' }) 
    dish: Dish;  

    @OneToOne(() => Delivery, (delivery) => delivery.order)
    @JoinColumn({ name: 'delivery_id' }) 
    delivery: Delivery;  
}

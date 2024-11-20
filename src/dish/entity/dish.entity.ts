import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Restaurant } from '../../restaurant/entity/restaurant.entity'
import { Order } from 'src/order/entity/order.entity';

@Entity('dishes')
export class Dish {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'name', type: 'varchar', length: 255 })
    name: string;

    @Column({ name: 'category', type: 'varchar', length: 255, nullable: true })
    category: string | null;

    @Column({ name: 'price', type: 'float', nullable: true })
    price: number | null;

    @Column({ name: 'popularity_score', type: 'varchar', length: 255 })
    popularityScore: string;

    @Column({ name: 'preparation_time', type: 'varchar', length: 255 })
    preparationTime: number;

    @Column({ name: 'availability_status', type: 'boolean' })
    availabilityStatus: boolean;

    @CreateDateColumn({ name: 'createdAt', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updatedAt', type: 'timestamp' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deletedAt', type: 'timestamp', nullable: true })
    deletedAt: Date;

    @ManyToOne(() => Restaurant, (restaurant) => restaurant.dishes)
    @JoinColumn({ name: 'restaurant_id' })
    restaurant: Restaurant;  

    @OneToOne(() => Order, (order) => order.dish)
    // @JoinColumn({ name: 'order_id' })  
    order: Order; 
}

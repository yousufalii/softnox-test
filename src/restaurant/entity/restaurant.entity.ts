import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from 'typeorm';
import { Dish } from './../../dish/entity/dish.entity';
import { Order } from 'src/order/entity/order.entity';

@Entity('restaurants')
export class Restaurant {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'name', type: 'varchar', length: 255 })
    name: string;

    @Column({ name: 'location', type: 'varchar', length: 255 })
    location: string;

    @Column({ name: 'rating', type: 'float', nullable: true })
    rating: number | null;

    @CreateDateColumn({ name: 'createdAt', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updatedAt', type: 'timestamp' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deletedAt', type: 'timestamp', nullable: true })
    deletedAt: Date;

    @OneToMany(() => Dish, (dish) => dish.restaurant)
    dishes: Dish[];  

    @OneToMany(() => Order, (order) => order.restaurant)
    orders: Order[];
}

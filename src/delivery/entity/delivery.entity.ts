import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Order } from 'src/order/entity/order.entity';
import { User } from 'src/user/entity/user.entity'; 

@Entity('deliveries')
export class Delivery {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.deliveries)
    @JoinColumn({ name: 'user_id' })  
    assignedDriver: User;

    @Column({ name: 'delivery_time', type: 'timestamp', nullable: true })
    deliveryTime: Date; 

    @Column({ name: 'estimated_delivery_duration', type: 'varchar', nullable: true })
    estimatedDeliveryDuration: string; 

    @CreateDateColumn({ name: 'createdAt', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updatedAt', type: 'timestamp' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deletedAt', type: 'timestamp', nullable: true })
    deletedAt: Date;

    @ManyToOne(() => Order, (order) => order.delivery)
    @JoinColumn({ name: 'order_id' })
    order: Order;
}

import { Delivery } from 'src/delivery/entity/delivery.entity';
import { Order } from 'src/order/entity/order.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'fullName', type: 'varchar', length: 150 })
    fullName: string;

    @Column({ type: 'varchar', length: 100, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 255 })
    password: string;

    @Column({ name: 'profilePicture', type: 'text', nullable: true })
    profilePicture: string;

    @CreateDateColumn({ name: 'createdAt', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updatedAt', type: 'timestamp' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deletedAt', type: 'timestamp', nullable: true })
    deletedAt: Date;

    @OneToMany(() => Order, (order) => order.user)
    orders: Order[]; 

    @OneToMany(() => Delivery, (delivery) => delivery.assignedDriver)
    deliveries: Delivery[]; 
}

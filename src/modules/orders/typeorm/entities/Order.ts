import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import User from '../../../users/typeorm/entities/User';
import OrdersProducts from './OrdersProducts';

@Entity('orders')
class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, user => user.order)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column()
    user_id: string;

    @Column()
    cliente: string;

    @OneToMany(() => OrdersProducts, order_products => order_products.order, {
        cascade: true,
    })
    order_products: OrdersProducts[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Order;
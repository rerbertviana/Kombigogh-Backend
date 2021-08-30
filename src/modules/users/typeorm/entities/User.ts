import Product from '../../../products/typeorm/entities/Product';
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import Order from '../../../orders/typeorm/entities/Order';

@Entity('users')
class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nome: string;

    @Column()
    email: string;

    @Column()
    senha: string;

    @Column()
    telefone: string;
    
    @Column()
    avatar: string;

    @OneToMany(() => Product, product => product.user, {
        cascade: true,
    })
    product: Product[];

    @OneToMany(() => Order, order => order.user, {
        cascade: true,
    })
    order: Order[];


    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default User;
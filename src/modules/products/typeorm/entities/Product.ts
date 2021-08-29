import Category from '../../../categories/typeorm/entities/Category';
import User from '../../../users/typeorm/entities/User';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import OrdersProducts from '../../../orders/typeorm/entities/OrdersProducts';


@Entity('products')
class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nome: string;

    @Column()
    descricao: string;

    @Column()
    imagem: string;

    @Column("float8")
    preco: number;

    @Column("int4")
    quantidade: number;

    @ManyToOne(() => User, user => user.product)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Category, category => category.product)
    @JoinColumn({ name: 'category_id' })
    category: Category;

    @OneToMany(() => OrdersProducts, order_products => order_products.product)
    order_products: OrdersProducts[];

    @Column()
    user_id: string;

    @Column()
    category_id: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Product;
import Product from '../../../products/typeorm/entities/Product';
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

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
    @JoinColumn({ name: 'product_id' })
    product: Product[];

    @Column()
    product_id: string;


    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default User;
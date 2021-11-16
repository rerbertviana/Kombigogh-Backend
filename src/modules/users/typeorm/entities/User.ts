import Product from '../../../products/typeorm/entities/Product';
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import Order from '../../../orders/typeorm/entities/Order';
import { Exclude, Expose } from 'class-transformer';

@Entity('users')
class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nome: string;

    @Column()
    email: string;

    @Column()
    @Exclude()
    senha: string;

    @Column()
    telefone: string;
    
    @Column()
    avatar: string;

    @Column()
    ativo: boolean;

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

    @Expose({ name: 'avatar_url' })
    getAvatarUrl(): string | null {
        if (!this.avatar) {
            return null;
        }
        return `${process.env.APP_API_URL}/files/${this.avatar}`;
    }
}

export default User;
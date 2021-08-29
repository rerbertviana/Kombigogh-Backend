import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateOrders1630174691873 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table ({
                name: 'orders',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'cliente',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'user_id',
                        type: 'uuid',
                        isNullable: true,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp with time zone',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp with time zone',
                        default: 'now()',
                    },
                ],
                foreignKeys: [
                    {
                        name: 'OrderUser',
                        referencedTableName: 'users',
                        referencedColumnNames: ['id'],
                        columnNames: ['user_id'],
                        onDelete: 'SET NULL',
                        onUpdate: 'CASCADE',
                    }
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('orders');
    }
}

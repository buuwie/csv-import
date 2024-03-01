import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('csv')
export class CsvEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    name: string;

    @Column({nullable: true})
    sku: string;

    @Column({nullable: true})
    price: string;
}
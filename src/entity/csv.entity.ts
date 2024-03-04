import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('csv')
export class CsvEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    serial: string;

    @Column({nullable: true})
    name: string;

    @Column({nullable: true})
    category: string;

    @Column({nullable: true})
    size: string;

    @Column({nullable: true})
    description: string;

    @Column({nullable: true})
    status: productStatus;

    @Column({nullable: true})
    manufactureDate: string;

    @Column({nullable: true})
    warranty: string;
}

export enum productStatus {
    AVAILABLE = 'AVAILABLE',
    OUT_OF_STOCK = 'OUT_OF_STOCK'
}
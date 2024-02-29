import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('csv')
export class CsvEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;
    
    @Column()
    company: string;

    @Column()
    city: string;

    @Column()
    country: string;

    @Column()
    phone: string;
    
    @Column()
    email: string;
}
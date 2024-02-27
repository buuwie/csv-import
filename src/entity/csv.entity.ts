import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('csv')
export class CsvEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    firstName: string;

    @Column({nullable: true})
    lastName: string;
    
    @Column({nullable: true})
    company: string;

    @Column({nullable: true})
    city: string;

    @Column({nullable: true})
    country: string;

    @Column({nullable: true})
    phone: string;
    
    @Column({nullable: true})
    email: string;
}
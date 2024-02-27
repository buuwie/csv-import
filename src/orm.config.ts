import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { CsvEntity } from "./entity/csv.entity";
export const config: TypeOrmModuleOptions = {
    type: 'postgres',
    port: 5432,
    host: 'localhost',
    username: 'postgres',
    password: 'hung04112002',
    database: 'newapp',
    autoLoadEntities: true,
    synchronize: true,
    entities: [CsvEntity],
}
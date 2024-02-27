import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './orm.config';
import { CsvModule } from './csv/csv.module';
import { CsvEntity } from './entity/csv.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    CsvModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

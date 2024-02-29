import { Module } from '@nestjs/common';
import { CsvController } from './csv.controller';
import { CsvService } from './csv.service';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CsvEntity } from 'src/entity/csv.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CsvEntity]),
    MulterModule.register({
      dest: './uploads',
    }),
    AuthModule
  ],
  controllers: [CsvController],
  providers: [CsvService]
})
export class CsvModule {}

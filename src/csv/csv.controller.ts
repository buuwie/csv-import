import { Controller, InternalServerErrorException, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import * as csv from 'csv-parser';
import { CsvService } from './csv.service';


@Controller('file')
export class CsvController {

    constructor (private readonly csvService : CsvService) {}

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async importCsv(@UploadedFile() file: any) {
        if(!file) {
            throw new InternalServerErrorException('No file uploaded');
        }
        const filePath = file.path;
        await this.csvService.importCsvData(filePath);
        return 'Csv file uploaded and processed';
    }
}

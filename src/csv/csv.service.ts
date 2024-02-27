import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as csv from 'csv-parser';
import { createReadStream } from 'fs';
import { CsvEntity } from 'src/entity/csv.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CsvService {
    
    constructor (
        @InjectRepository(CsvEntity)
    private readonly repo: Repository<CsvEntity>) {}

    async importCsvData(filePath: string) {
        const results = [];
        createReadStream(filePath).pipe(csv()).on('data', (data) => results.push(data)).on('end', async () => {
            for (const result of results) {
                const csvData = new CsvEntity();
                csvData.firstName = result.FirstName;
                csvData.lastName = result.LastName;
                csvData.company = result.Company;
                csvData.city = result.City;
                csvData.country = result.Country;
                csvData.phone = result.Phone;
                csvData.email = result.Email;
                await this.repo.save(csvData);
            }
            console.log(results);
        });
    }
}

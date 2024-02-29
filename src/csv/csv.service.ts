import { Injectable, InternalServerErrorException, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as csv from 'csv-parser';
import { createReadStream } from 'fs';
import { CreateProductDto } from 'src/dto/createProduct.dto';
import { CsvEntity } from 'src/entity/csv.entity';
import { UserEntity } from 'src/entity/user.entity';
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

    async getAllData () {
        return this.repo.find();
    }

    async getOneData (id: number) {
        return this.repo.findOne({where: {id: id}});
    }

    async createData (CreateProductDto: CreateProductDto) {
        const product = new CsvEntity();
        const { firstName, lastName, company, city, country, phone, email} = CreateProductDto;
        product.firstName = firstName;
        product.lastName = lastName;
        product.company = company;
        product.city = city;
        product.country = country;
        product.phone = phone;
        product.email = email;

        this.repo.create(product);
        return await this.repo.save(product);
    }

    async editData (id: number, firstName: string, lastName: string, company: string, city: string, country: string,
        phone: string, email: string) {
        const product = await this.repo.findOne({where: {id: id}});
        if (product) {
            product.firstName = firstName;
            product.lastName = lastName;
            product.company = company;
            product.city = city;
            product.country = country;
            product.phone = phone;
            product.email = email;
            return this.repo.save(product);
        }
        else throw new InternalServerErrorException('Product not found');
    }

    async deleteData (id: number) {
        const product = await this.repo.findOne({where: {id: id}});
        if (product) {
            return this.repo.delete(id).then(() => {});
        }
        else throw new InternalServerErrorException('Product not found');
    }
}

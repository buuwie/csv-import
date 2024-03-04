import { Injectable, InternalServerErrorException, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as csv from 'csv-parser';
import { createReadStream } from 'fs';
import { CreateProductDto } from 'src/dto/createProduct.dto';
import { EditProductDto } from 'src/dto/editProduct.dto';
import { CsvEntity, productStatus } from 'src/entity/csv.entity';
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
                csvData.name = result.name;
                csvData.serial = result.serial;
                csvData.category = result.category;
                csvData.size = result.size;
                csvData.description = result.description;
                csvData.status = result.status;
                csvData.manufactureDate = result.manufactureDate;
                csvData.warranty = result.warranty;
                await this.repo.save(csvData);
            }
            console.log(results);
            return results;
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
        const { name, serial, category, size, description, manufactureDate, warranty } = CreateProductDto;
        product.name = name;
        product.serial = serial;
        product.category = category;
        product.size = size;
        product.description = description;
        product.status = productStatus.AVAILABLE;
        product.manufactureDate = new Date().toLocaleString();
        product.warranty = warranty;

        this.repo.create(product);
        return await this.repo.save(product);
    }

    async editData (id: number, EditProductDto: EditProductDto, status: productStatus) {
        const product = await this.repo.findOne({where: {id: id}});
        const { name, serial, category, size, description, manufactureDate, warranty } = EditProductDto;
        if (product) {
            product.name = name;
            product.serial = serial;
            product.category = category;
            product.size = size;
            product.description = description;
            product.manufactureDate = manufactureDate;
            product.status = status;
            product.warranty = warranty;
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

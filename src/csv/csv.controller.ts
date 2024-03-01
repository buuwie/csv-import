import { Body, Controller, Delete, Get, InternalServerErrorException, Param, Patch, Post, UploadedFile, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import * as csv from 'csv-parser';
import { CsvService } from './csv.service';
import { CreateProductDto } from 'src/dto/createProduct.dto';
import { AuthGuard } from '@nestjs/passport';


@Controller('file')
@UseGuards(AuthGuard())
export class CsvController {

    constructor (private csvService : CsvService) {}

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

    @Get('data')
    getData () {
        return this.csvService.getAllData();
    }

    @Get('data/:id')
    async getOne(@Param('id') id: number) {
        return this.csvService.getOneData(id);
    }

    @Post('data/create') 
    createProduct (@Body(ValidationPipe) data: CreateProductDto) {
        return this.csvService.createData(data);
    }

    @Patch('data/edit/:id')
    updateProduct (@Param('id') id: number, @Body('name') name: string, @Body('sku') sku: string, @Body('price') price: string) {
        return this.csvService.editData(id, name, sku, price);
    }

    @Delete('data/delete/:id')
    deleteProduct(@Param('id') id: number) {
        return this.csvService.deleteData(id);
    }
}

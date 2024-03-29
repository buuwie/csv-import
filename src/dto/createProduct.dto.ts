import { IsNotEmpty } from "class-validator"
import { productStatus } from "src/entity/csv.entity";

export class CreateProductDto {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    serial: string;

    @IsNotEmpty()
    category: string;

    @IsNotEmpty()
    size: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    manufactureDate: string;

    @IsNotEmpty()
    warranty: string;
}
import { IsNotEmpty } from "class-validator"
import { productStatus } from "src/entity/csv.entity";

export class EditProductDto {

    name: string;

    serial: string;

    category: string;

    size: string;

    description: string;

    @IsNotEmpty()
    status: productStatus;

    manufactureDate: string;

    warranty: string;
}
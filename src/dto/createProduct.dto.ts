import { IsNotEmpty } from "class-validator"

export class CreateProductDto {

    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsNotEmpty()
    company: string;

    @IsNotEmpty()
    city: string;

    @IsNotEmpty()
    country: string;

    @IsNotEmpty()
    phone: string;
    
    @IsNotEmpty()
    email: string;
}
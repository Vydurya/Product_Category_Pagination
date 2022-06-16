import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductDto{

    @IsString()
    @IsNotEmpty()
    productName: string;

    @IsNumber()
    @IsNotEmpty()
    qty: number;

    @IsNumber()
    @IsNotEmpty()
    amount: number;

    @IsNumber()
    @IsNotEmpty()
    categoryId: number;
}
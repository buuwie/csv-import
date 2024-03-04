import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { productStatus } from "./entity/csv.entity";

export class ProductStatusValidationPipe implements PipeTransform {
  readonly allowedStatus = [productStatus.AVAILABLE, productStatus.OUT_OF_STOCK];

  transform(value: any, metadata: ArgumentMetadata): any {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} is an invalid status.`);
    }
    return value;
  }

  private isStatusValid(status : any) {
    const index = this.allowedStatus.indexOf(status);

    return index !== -1;
  }

}
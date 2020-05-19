import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ValidationError } from 'class-validator/types/validation/ValidationError';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  static toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !ValidationPipe.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);

    let errors = await validate(object);
    let customResponse;

    if (errors.length > 0) {

      customResponse = await this.customUpdateNotValidatedParams(errors, object, value, metatype);

      if (customResponse.errors && customResponse.errors.length) {

        throw new BadRequestException(customResponse.errors);
      }

      return customResponse.value;
    }

    return value;
  }

  async customUpdateNotValidatedParams(currentErrors: ValidationError[], currentObject: any, currentValue: any, metatype: any): Promise<{errors: ValidationError[] | null, value: any}> {
    const value = currentValue;
    let object = currentObject;
    let errors = currentErrors;

    for (const error of errors) {
      if (error.constraints.isInt) {
        if (!isNaN(parseInt(error.value))) {
          object[error.property] = parseInt(error.value);
          value[error.property] = parseInt(error.value);

          continue;
        }
      }

      if (error.constraints.isBoolean) {
        if (error.value === 'false') {
          object[error.property] = false;
          value[error.property] = false;

          continue;
        }

        if (error.value === 'true') {
          object[error.property] = true;
          value[error.property] = true;
        }
      }
    }

    object = plainToClass(metatype, value);
    errors = await validate(object);

    return {errors, value};
  }
}
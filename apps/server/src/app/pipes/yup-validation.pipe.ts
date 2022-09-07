import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { AnyObjectSchema } from 'yup';

@Injectable()
export class YupValidationPipe implements PipeTransform {
  constructor(private readonly schema: AnyObjectSchema) {}

  async transform(value, metadata: ArgumentMetadata) {
    try {
      if (metadata.type === 'body' && this.schema) {
        await this.schema.validate(value, {
          abortEarly: false,
          stripUnknown: true,
        });
      }
    } catch (error) {
      throw new BadRequestException(error);
    }

    return value;
  }
}

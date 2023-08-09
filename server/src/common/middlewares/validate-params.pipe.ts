import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import z from 'zod';

@Injectable()
export class ValidateParamsPipe implements PipeTransform {
  constructor(private readonly schema: z.ZodSchema) {}

  transform(value: unknown) {
    if (!this.schema.safeParse(value).success)
      throw new BadRequestException({ message: 'Invalid parameters' });

    return value;
  }
}

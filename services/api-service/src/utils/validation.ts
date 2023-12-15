import {PipeTransform, ArgumentMetadata, BadRequestException} from '@nestjs/common';
import {ZodObject} from 'zod';

class ZodValidationPipe implements PipeTransform {
    constructor(private schema: ZodObject<any>) {
    }

    transform(value: unknown, metadata: ArgumentMetadata) {
        if (metadata.type == "custom") return value;
        try {
            this.schema.parse(value);
        } catch (error) {
            throw new BadRequestException('Validation failed');
        }
        return value;
    }
}

export function ValidationPipe(schema: ZodObject<any>) {
    return new ZodValidationPipe(schema);
}

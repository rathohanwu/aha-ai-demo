import {HttpException} from '@nestjs/common';

export function throwHttpException(message: string, status = 430) {
  throw new HttpException(message, status);
}

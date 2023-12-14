export type ErrorType = Error & { status: number };

export function throwHttpException(message: string, status = 430): ErrorType {

  const error = new Error(message);
  throw {
    ...error,
    status: status,
  };
}
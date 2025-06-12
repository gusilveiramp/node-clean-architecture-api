export class CustomError extends Error {
  status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    Error.captureStackTrace(this, this.constructor);
  }
}

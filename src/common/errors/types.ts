// src/common/errors/types.ts

export type CustomErrorResponse = {
  status: number;
  message: string;
  errors: Array<{
    field?: string;
    message: string;
  }>;
};

// src/common/errors/i18n/types.ts

export type Messages = {
  errors: {
    generic: {
      internal: string;
      validation: string;
      routeNotFound: string;
      invalidBody: string;
    };
    zod: {
      [field: string]: {
        [rule: string]: string;
      };
    };
    database: {
      unique: (field: string) => string;
      notFound: string;
      genericDb: string;
      users: {
        notFound: string;
      };
    };
  };
  // fields: Record<string, string>;
};

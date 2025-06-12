export type Messages = {
  errors: {
    generic: {
      internal: string;
      validation: string;
      routeNotFound: string;
    };
    zod: {
      [field: string]: {
        [rule: string]: string;
      };
    };
    prisma: {
      unique: (field: string) => string;
      notFound: string;
      genericDb: string;
    };
  };
  fields: Record<string, string>;
};

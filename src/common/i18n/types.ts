export type Messages = {
  validation: {
    string: {
      required: string;
      invalid: string;
      minLength: string;
      fullName: string;
    };
    number: {
      required: string;
      invalid: string;
      min: string;
    };
    email: {
      required: string;
      invalid: string;
    };
  };

  errors: {
    generic: {
      internal: string;
      validation: string;
      routeNotFound: string;
      invalidBody: string;
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
};

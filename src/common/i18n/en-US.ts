import { Messages } from "./types";

export const enUS: Messages = {
  validation: {
    string: {
      required: "This field is required.",
      invalid: "Invalid value for text field.",
      minLength: "The field must have at least {min} characters.",
      fullName: "Please provide first and last name.",
    },
    number: {
      required: "This numeric field is required.",
      invalid: "Invalid value for number field.",
      min: "The minimum allowed value is {min}.",
    },
    email: {
      required: "Email is required.",
      invalid: "Invalid email format.",
    },
  },

  errors: {
    generic: {
      validation: "Validation error on submitted data.",
      internal: "Internal server error.",
      routeNotFound: "Route not found.",
      invalidBody: "Invalid or missing request body. Check Content-Type and JSON format.",
    },

    database: {
      unique: (field) => `This ${field} is already registered.`,
      notFound: "Record not found.",
      genericDb: "Database error.",
      users: {
        notFound: "No user found.",
      },
    },
  },
};

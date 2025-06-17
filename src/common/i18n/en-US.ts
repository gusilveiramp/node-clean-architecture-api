import { Messages } from "./types";

export const enUS: Messages = {
  errors: {
    generic: {
      validation: "Validation error in the submitted data.",
      internal: "Internal server error.",
      routeNotFound: "Route not found.",
      invalidBody:
        "Invalid or missing request body. Check Content-Type and JSON format.",
    },
    zod: {
      id: {
        required: "User ID is required.",
        invalidType: "ID must be a number.",
      },
      name: {
        required: "Name is required.",
        min: "Name must have at least 3 characters.",
        fullName: "Please provide first and last name.",
        invalidType: "Name must be a string.",
      },
      email: {
        required: "Email is required.",
        invalid: "Invalid email format.",
        invalidType: "Email must be a string.",
      },
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

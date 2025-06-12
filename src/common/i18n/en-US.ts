import { Messages } from "./types";

export const enUS: Messages = {
  errors: {
    generic: {
      validation: "Validation error in the submitted data.",
      internal: "Internal server error.",
      routeNotFound: "Route not found.",
    },
    zod: {
      name: {
        required: "Name is required.",
        min: "Name must have at least 3 characters.",
        fullName: "Please provide first and last name.",
      },
      email: {
        required: "Email is required.",
        invalid: "Invalid email format.",
      },
    },
    prisma: {
      unique: (field) => `This ${field} is already registered.`,
      notFound: "Record not found.",
      genericDb: "Database error.",
    },
  },
  fields: {
    email: "email",
    name: "name",
    username: "username",
  },
};

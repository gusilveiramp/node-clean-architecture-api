import { z } from "zod";
import { Messages } from "../../../common/i18n/types";

// Body schema
export function UpdateUserSchema(messages: Messages) {
  return z.object({
    name: z
      .string({
        invalid_type_error: messages.validation.string.invalid,
      })
      .min(3, messages.validation.string.minLength)
      .optional(),

    email: z
      .string({
        invalid_type_error: messages.validation.string.invalid,
      })
      .email(messages.validation.email.invalid)
      .optional(),
  });
}

// Params schema
export function UpdateUserParamsSchema(messages: Messages) {
  return z.object({
    user_id: z.coerce.number({
      required_error: messages.validation.number.required,
      invalid_type_error: messages.validation.number.invalid,
    }),
  });
}

// Tipo final que o UseCase vai usar (params + body)
export type UpdateUserDTO = z.infer<ReturnType<typeof UpdateUserSchema>> & {
  id: number;
};

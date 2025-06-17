import { z } from "zod";
import { Messages } from "../../../common/i18n/types";

export function CreateUserSchema(messages: Messages) {
  return z.object({
    name: z
      .string({
        required_error: messages.validation.string.required,
        invalid_type_error: messages.validation.string.invalid,
      })
      .min(3, messages.validation.string.minLength),

    email: z
      .string({
        required_error: messages.validation.email.required,
        invalid_type_error: messages.validation.string.invalid,
      })
      .email(messages.validation.email.invalid),
  });
}

export type CreateUserDTO = z.infer<ReturnType<typeof CreateUserSchema>>;

import { z } from "zod";
import { Messages } from "../../../common/i18n/types";

export function CreateUserSchema(messages: Messages) {
  return z.object({
    name: z
      .string({
        required_error: messages.errors.zod.name.required,
        invalid_type_error: messages.errors.zod.name.invalidType,
      })
      .min(3, messages.errors.zod.name.min),

    email: z
      .string({
        required_error: messages.errors.zod.email.required,
        invalid_type_error: messages.errors.zod.email.invalidType,
      })
      .email(messages.errors.zod.email.invalid),
  });
}

export type CreateUserDTO = z.infer<ReturnType<typeof CreateUserSchema>>;

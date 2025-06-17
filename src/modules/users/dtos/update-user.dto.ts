import { z } from "zod";
import { Messages } from "../../../common/i18n/types";

// Body schema
export function UpdateUserSchema(messages: Messages) {
  return z.object({
    name: z
      .string({
        invalid_type_error: messages.errors.zod.name.invalidType,
      })
      .min(3, messages.errors.zod.name.min)
      .optional(),
    email: z
      .string({
        invalid_type_error: messages.errors.zod.email.invalidType,
      })
      .email(messages.errors.zod.email.invalid)
      .optional(),
  });
}

// Params schema
export function UpdateUserParamsSchema(messages: Messages) {
  return z.object({
    user_id: z.coerce.number({
      required_error: messages.errors.zod.id.required,
      invalid_type_error: messages.errors.zod.id.invalidType,
    }),
  });
}

// Tipo final que o UseCase vai usar (params + body)
export type UpdateUserDTO = z.infer<ReturnType<typeof UpdateUserSchema>> & {
  id: number;
};

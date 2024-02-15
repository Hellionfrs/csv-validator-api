import { z } from "zod";

export const InputSchemaRegister = z.object({
  name: z
    .string({
      required_error: "Username es requerido",
      invalid_type_error: "Username debe ser un string",
    }).min(3, "name con mas de 3 caracteres")
    .max(100),
  email: z
    .string({
      required_error: "Email es requerido. Debe ser user@mail.something",
      invalid_type_error: "Email debe ser un string",
    })
    .refine((value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), {
      message:
        "El formato del email no es válido. Debe ser user@mail.something",
    }),
  age: z
    .string({
      invalid_type_error:
        "Age debe ser un número o una cadena que represente un número",
    })
    .refine(
      (value) => {
        const parsedAge = parseInt(value, 10);
        return !isNaN(parsedAge);
      },
      {
        message: "Age debe ser un número o una cadena que represente un número",
      }
    )
    .transform((value) => parseInt(value, 10))
    .optional(),
});

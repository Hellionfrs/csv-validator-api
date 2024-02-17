
import { z } from "zod";
import { currentDateFormated } from "../utils/currentDate";
import { superSecret } from "../utils/const.utils";

const RoleEnum = z.enum(["user", "admin"], {
  errorMap: (issue, ctx) => {
    return { message: "Role solo puede ser 'user' o 'admin'" };
  },
});

export const UserSchemaRegister = z.object({
  name: z
    .string({
      required_error: "name es requerido",
      invalid_type_error: "name debe ser un string",
    })
    .max(100),
  password: z.string().optional().default(superSecret),
  email: z
    .string({
      required_error: "Email es requerido. Debe ser user@mail.something",
      invalid_type_error: "Email debe ser un string",
    })
    .refine((value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), {
      message:
        "El formato del email no es válido. Debe ser user@mail.something",
    }),

  role: RoleEnum.optional().default("user"),
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
function isValidISODate(value: string): boolean {
  // Intenta crear una nueva fecha a partir de la cadena proporcionada
  const date = new Date(value);

  // Valida si la fecha es válida y si la cadena coincide con el formato ISO8601
  return !isNaN(date.getTime()) && date.toISOString() === value;
}

// UserSchema to parse from csv to autocomplete fields
export const UserSchema = UserSchemaRegister.extend({
  createdat: z
    .string()
    .refine((value) => isValidISODate(value), {
      message:
        "El formato de la fecha no es válido. Utiliza el formato ISO8601.",
    })
    .default(currentDateFormated),
  updatedat: z
    .string()
    .refine((value) => isValidISODate(value), {
      message:
        "El formato de la fecha no es válido. Utiliza el formato ISO8601.",
    })
    .default(currentDateFormated),
});

export const UserSchemaLogin = UserSchemaRegister.pick({
  password: true,
  email: true,
});
// TODO user-edit
export const UserSchemaEdit = UserSchemaRegister.pick({
  email: true,
  firstname: true,
  lastname: true,
})
  .partial()
  .refine(
    (data) => {
      // Verificar que al menos un campo esté presente en el objeto
      return Object.keys(data).length > 0;
    },
    {
      message: "Intenta con email, firstname o lastname",
    }
  );

export type withId = {
  id: number;
};
export type UserRegister = z.infer<typeof UserSchemaRegister>;
export type UserData = z.infer<typeof UserSchema>; // to create
export type User = z.infer<typeof UserSchema> & withId; // to get from db
export type UserEdit = z.infer<typeof UserSchemaEdit>;
export type UserLogin = z.infer<typeof UserSchemaLogin>;

// const newuser: User = {
//   id: 12,
//   username: "fred",
//   password: "asjdhajksf",
//   email: "fred@mail.com",
//   age: 20,
//   role: "admin",
//   createdAt: "asdasd",
//   updatedAt: "azsdasd"
// }

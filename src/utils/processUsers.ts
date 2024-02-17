import { InputSchemaRegister } from "../models/csv.model";
import { User } from "../models/user.model";
import { ZodError } from "zod";

interface ValidationErrorDetails {
  [key: string]: string;
}

interface ValidationError {
  row: number;
  original: any;
  details: ValidationErrorDetails;
}

interface ValidationResult {
  ok: boolean;
  data: {
    success: User[];
    errors: ValidationError[];
  };
}

// Función para validar un usuario con el esquema y clasificarlo
function validateUser(user: User, index: number): ValidationResult {
  try {
    // Intenta validar el usuario con el esquema
    // TODO verificar el mail
    InputSchemaRegister.parse(user);
    console.log("se valido", user);
    // Si pasa la validación, devuelve un objeto con ok: true y los datos del usuario
    return { ok: true, data: { success: [user], errors: [] } };
  } catch (error) {
    // Cast 'error' to ZodError to resolve TypeScript error
    const zodError = error as ZodError;

    // Si no pasa la validación, devuelve un objeto con ok: false y los errores detallados
    const errorDetails: ValidationErrorDetails = {};
    zodError.errors.forEach((e) => {
      errorDetails[e.path[0]] = e.message;
    });

    return {
      ok: false,
      data: {
        success: [],
        errors: [
          {
            row: index, // Use the original index,
            original: user,
            details: errorDetails,
          },
        ],
      },
    };
  }
}

// Función para procesar la lista de usuarios y clasificarlos
export function processUserList(users: User[]): ValidationResult {
  const result: ValidationResult = {
    ok: true,
    data: { success: [], errors: [] },
  };

  users.forEach((user, index) => {
    console.log("index", index,"validating", user);
    const validationResult = validateUser(user, index);
    if (validationResult.ok) {
      result.data.success.push(...validationResult.data.success);
    } else {
      validationResult.data.errors.forEach((error) => {
        // Use the original index for adjusting the row number
        
      });
      result.ok = false;
      result.data.errors.push(...validationResult.data.errors);
    }
  });

  return result;
}

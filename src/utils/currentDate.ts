export function currentDateFormated(): string {
  const fechaActual = new Date();
  return fechaActual.toISOString();
}

export function isValidISODate(value: string): boolean {
  // Intenta crear una nueva fecha a partir de la cadena proporcionada
  const date = new Date(value);
  
  // Valida si la fecha es válida y si la cadena coincide con el formato ISO8601
  return !isNaN(date.getTime()) && date.toISOString() === value;
}
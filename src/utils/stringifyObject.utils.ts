export function objStringify(object: Record<string, unknown>): string {
  let result: any[] = [];

  for (let key in object) {
    const value = object[key];
    const formattedValue: string | any =
      typeof value === "string" ? `'${value}'` : value;
    result.push(`${key} = ${formattedValue}`);
  }

  return result.join(", ");
}

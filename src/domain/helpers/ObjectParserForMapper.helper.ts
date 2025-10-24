export const ObjectParserForMapper = <T extends Record<string, any>>(obj: T): any => {
  const result: any = Array.isArray(obj) ? [] : {};

  for (const [key, value] of Object.entries(obj)) {
    // 🔹 Convertir snake_case → camelCase
    const camelKey = key.replace(/_([a-z])/g, (_, c) => c.toUpperCase());

    // 🔹 Si es número, lo convertimos a string
    if (typeof value === "number") {
      result[camelKey] = value.toString();
    }

    // 🔹 Si es un objeto o array, procesamos recursivamente
    else if (typeof value === "object" && value !== null) {
      result[camelKey] = ObjectParserForMapper(value);
    }

    // 🔹 En cualquier otro caso, lo copiamos tal cual
    else {
      result[camelKey] = value;
    }
  }

  return result;
};

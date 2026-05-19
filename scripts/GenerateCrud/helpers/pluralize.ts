export const pluralize = (str: string) => {
  if (str.endsWith("s")) return `${str}es`;
  if (str.endsWith("y")) return `${str.slice(0, -1)}ies`;

  return `${str}s`;
}
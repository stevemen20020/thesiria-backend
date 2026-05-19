export const toCamelFolder = (str: string) => {
  return str.charAt(0).toLowerCase() + str.slice(1);
}
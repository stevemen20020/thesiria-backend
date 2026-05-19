export const toPrismaModelName = (
  model: string
) => {
  return (
    model.charAt(0).toLowerCase() +
    model.slice(1)
  );
};
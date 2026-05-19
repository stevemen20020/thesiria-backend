import { GLOBAL_ROUTES_PATH } from "../generate-crud.constants";
import { pluralize } from "../helpers/pluralize";
import { toCamelFolder } from "../helpers/toCamelFolder";
import { toKebabCase } from "../helpers/toKebabCase";
import fs from "fs-extra";

export const updateGlobalRoutes = async (
  model: string,
  useJwt: boolean
) =>{
  const plural = pluralize(model);

  const folderName = toCamelFolder(model);
  const kebabRoute = toKebabCase(model);

  let content = await fs.readFile(GLOBAL_ROUTES_PATH, "utf-8");

  const importLine = `import { ${plural}Routes } from "./${folderName}/routes";`;

  if (!content.includes(importLine)) {
    content = `${importLine}\n${content}`;
  }

  const middleware = useJwt
    ? "AuthMiddleware.jwtMiddleware(), "
    : "";

  const routeLine = `router.use('/${kebabRoute}', ${middleware}${plural}Routes.routes);`;

  const routerUseRegex = /(router\.use\(.*\)\s*)+(?![\s\S]*router\.use)/gm;

  if (!content.includes(routeLine)) {
    content = content.replace(
      routerUseRegex,
      (match) => `${match}\n${routeLine}`
    );
  }

  await fs.writeFile(GLOBAL_ROUTES_PATH, content);
}
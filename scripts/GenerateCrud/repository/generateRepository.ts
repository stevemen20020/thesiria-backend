import { lowercaseFirst } from "../helpers/lowerCaseFirst";
import { pluralize } from "../helpers/pluralize";
import { upperCaseFirst } from "../helpers/upperCaseFirst";

function entityName(model: string) {
  return pluralize(model);
}

export const generateRepository = (model: string) => {
  const folder = lowercaseFirst(model);
  const upperCaseModel = upperCaseFirst(model)

  return `import { Search${upperCaseModel}QueryParamsDto } from "../../dto/${folder}/search${upperCaseModel}Query.dto";
import { Update${upperCaseModel}Dto } from "../../dto/${folder}/update${upperCaseModel}.dto";
import { ${entityName(model)}Entity } from "../../entities/${folder}/${entityName(model).toLowerCase()}.entity";

export interface ${model}Repository {
    get${upperCaseModel}ById(id: string) :Promise<${entityName(model)}Entity>;
    get${pluralize(upperCaseModel)}(queryParams: Search${upperCaseModel}QueryParamsDto): Promise<[${entityName(model)}Entity[], number]>
    update${upperCaseModel}(dto: Update${upperCaseModel}Dto, id:string): Promise<${entityName(model)}Entity>
    delete${upperCaseModel}(id:string): Promise<string>
}
`;
}
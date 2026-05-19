import { lowercaseFirst } from "../helpers/lowerCaseFirst";
import { pluralize } from "../helpers/pluralize";
import { upperCaseFirst } from "../helpers/upperCaseFirst";

function entityName(model: string) {
  return pluralize(model);
}

export const generateDatasource = (model: string) => {
  const folder = lowercaseFirst(model);

  const modelUpperCase = upperCaseFirst(model)

  return `import { Search${model}QueryParamsDto } from "../../dto/${folder}/search${modelUpperCase}Query.dto";
import { Update${model}Dto } from "../../dto/${folder}/update${modelUpperCase}.dto";
import { ${entityName(model)}Entity } from "../../entities/${folder}/${entityName(model).toLowerCase()}.entity";

export interface ${model}Datasource {
    get${model}ById(id: string) :Promise<${entityName(model)}Entity>;
    get${pluralize(model)}(queryParams: Search${model}QueryParamsDto): Promise<[${entityName(model)}Entity[], number]>
    update${model}(dto: Update${model}Dto, id:string): Promise<${entityName(model)}Entity>
    delete${model}(id:string): Promise<string>
}
`;
}
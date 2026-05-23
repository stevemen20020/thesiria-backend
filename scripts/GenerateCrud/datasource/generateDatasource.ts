import { lowercaseFirst } from "../helpers/lowerCaseFirst";
import { upperCaseFirst } from "../helpers/upperCaseFirst";

export const generateDatasource = (model: string) => {
  const folder = lowercaseFirst(model);

  const modelUpperCase = upperCaseFirst(model)

  return `import { Search${modelUpperCase}QueryParamsDto } from "../../dto/${folder}/search${modelUpperCase}Query.dto";
import { Update${modelUpperCase}Dto } from "../../dto/${folder}/update${modelUpperCase}.dto";
import { Create${modelUpperCase}Dto } from "../../dto/${folder}/create${modelUpperCase}.dto";
import { ${modelUpperCase}Entity } from "../../entities";

export interface ${modelUpperCase}Datasource {
    get${modelUpperCase}ById(id: string) :Promise<${modelUpperCase}Entity>;
    get${modelUpperCase}(queryParams: Search${modelUpperCase}QueryParamsDto): Promise<[${modelUpperCase}Entity[], number]>
    update${modelUpperCase}(dto: Update${modelUpperCase}Dto, id:string): Promise<${modelUpperCase}Entity>
    delete${modelUpperCase}(id:string): Promise<string>
    create${modelUpperCase}(dto: Create${modelUpperCase}Dto): Promise<${modelUpperCase}Entity>
}
`;
}
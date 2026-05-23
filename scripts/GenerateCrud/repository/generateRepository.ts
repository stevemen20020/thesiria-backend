import { lowercaseFirst } from "../helpers/lowerCaseFirst";
import { upperCaseFirst } from "../helpers/upperCaseFirst";

export const generateRepository = (model: string) => {
  const folder = lowercaseFirst(model);
  const upperCaseModel = upperCaseFirst(model)

  return `import { Search${upperCaseModel}QueryParamsDto } from "../../dto/${folder}/search${upperCaseModel}Query.dto";
import { Update${upperCaseModel}Dto } from "../../dto/${folder}/update${upperCaseModel}.dto";
import { Create${upperCaseModel}Dto } from "../../dto/${folder}/create${upperCaseModel}.dto";
import { ${upperCaseModel}Entity } from "../../entities";

export interface ${upperCaseModel}Repository {
    get${upperCaseModel}ById(id: string) :Promise<${upperCaseModel}Entity>;
    get${upperCaseModel}(queryParams: Search${upperCaseModel}QueryParamsDto): Promise<[${upperCaseModel}Entity[], number]>
    update${upperCaseModel}(dto: Update${upperCaseModel}Dto, id:string): Promise<${upperCaseModel}Entity>
    delete${upperCaseModel}(id:string): Promise<string>
    create${upperCaseModel}(dto: Create${upperCaseModel}Dto): Promise<${upperCaseModel}Entity>
}
`;
}
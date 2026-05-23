import { upperCaseFirst } from "../helpers/upperCaseFirst";
import { lowercaseFirst } from "../helpers/lowerCaseFirst";
import { PrismaModel } from "../generate-crud.types";

export const generateRepositoryImpl = (
  model: PrismaModel
) => {

  const upperModel =
    upperCaseFirst(model.name);

  const lowerModel =
    lowercaseFirst(model.name);

  return `import { ${upperModel}Repository } from "../../../domain/repositories/${lowerModel}/${lowerModel}.repository";
import { ${upperModel}Datasource } from "../../../domain/datasources/${lowerModel}/${lowerModel}.datasource";
import { ${upperModel}Entity } from "../../../domain/entities";
import { Search${upperModel}QueryParamsDto } from "../../../domain/dto/${lowerModel}/search${upperModel}Query.dto";
import { Update${upperModel}Dto } from "../../../domain/dto/${lowerModel}/update${upperModel}.dto";
import { Create${upperModel}Dto } from "../../../domain/dto/${lowerModel}/create${upperModel}.dto";

export class ${upperModel}RepositoryImplementation implements ${upperModel}Repository {

    constructor(
        private readonly datasource: ${upperModel}Datasource
    ){}

    get${upperModel}ById(
        id: string
    ): Promise<${upperModel}Entity> {

        return this.datasource.get${upperModel}ById(id)
    }

    get${upperModel}(
        queryParams: Search${upperModel}QueryParamsDto
    ): Promise<[${upperModel}Entity[], number]> {

        return this.datasource.get${upperModel}(queryParams)
    }

    update${upperModel}(
        dto: Update${upperModel}Dto,
        id: string
    ): Promise<${upperModel}Entity> {

        return this.datasource.update${upperModel}(dto, id)
    }

    create${upperModel}(
        dto: Create${upperModel}Dto
    ): Promise<${upperModel}Entity> {

        return this.datasource.create${upperModel}(dto)
    }

    delete${upperModel}(
        id: string
    ): Promise<string> {

        return this.datasource.delete${upperModel}(id)
    }
}
`;
};
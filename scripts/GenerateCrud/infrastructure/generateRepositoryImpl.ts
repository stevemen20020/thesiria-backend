import { upperCaseFirst } from "../helpers/upperCaseFirst";
import { lowercaseFirst } from "../helpers/lowerCaseFirst";
import { pluralize } from "../helpers/pluralize";
import { PrismaModel } from "../generate-crud.types";

export const generateRepositoryImpl = (
  model: PrismaModel
) => {

  const upperModel =
    upperCaseFirst(model.name);

  const lowerModel =
    lowercaseFirst(model.name);

  const pluralModel =
    pluralize(upperModel);

  return `import { ${upperModel}Repository } from "../../../domain/repositories/${lowerModel}/${lowerModel}.repository";
import { ${upperModel}Datasource } from "../../../domain/datasources/${lowerModel}/${lowerModel}.datasource";
import { ${pluralModel}Entity } from "../../../domain/entities";
import { Search${upperModel}QueryParamsDto } from "../../../domain/dto/${lowerModel}/search${upperModel}Query.dto";
import { Update${upperModel}Dto } from "../../../domain/dto/${lowerModel}/update${upperModel}.dto";

export class ${upperModel}RepositoryImplementation implements ${upperModel}Repository {

    constructor(
        private readonly datasource: ${upperModel}Datasource
    ){}

    get${upperModel}ById(
        id: string
    ): Promise<${pluralModel}Entity> {

        return this.datasource.get${upperModel}ById(id)
    }

    get${pluralModel}(
        queryParams: Search${upperModel}QueryParamsDto
    ): Promise<[${pluralModel}Entity[], number]> {

        return this.datasource.get${pluralModel}(queryParams)
    }

    update${upperModel}(
        dto: Update${upperModel}Dto,
        id: string
    ): Promise<${pluralModel}Entity> {

        return this.datasource.update${upperModel}(dto, id)
    }

    delete${upperModel}(
        id: string
    ): Promise<string> {

        return this.datasource.delete${upperModel}(id)
    }
}
`;
};
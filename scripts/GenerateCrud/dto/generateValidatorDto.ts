import { upperCaseFirst } from "../helpers/upperCaseFirst";

export const generateValidator = (model: string) => {
    const upperCaseModel = upperCaseFirst(model)
    
  return `import { search${upperCaseModel}QueryParamsSchema } from "./search${upperCaseModel}Query.dto";
import { update${upperCaseModel}Schema } from "./update${upperCaseModel}.dto";
import { create${upperCaseModel}Schema } from "./create${upperCaseModel}.dto";

export class ${model}DtoValidator {

    static validateCreateDto(props: unknown) {
        return create${upperCaseModel}Schema.parse(props)
    }

    static validateUpdateDto(props: unknown) {
        return update${upperCaseModel}Schema.parse(props)
    }

    static validateSearch${upperCaseModel}ParamsQueryDto(props: unknown) {
        return search${upperCaseModel}QueryParamsSchema.parse(props)
    }
}
`;
}
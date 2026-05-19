
import { upperCaseFirst } from "../helpers/upperCaseFirst";
import { pluralize } from "../helpers/pluralize";
import { PrismaModel } from "../generate-crud.types";
import { lowercaseFirst } from "../helpers/lowerCaseFirst";
import { isScalarType } from "../generate-crud.constants";
import { toPrismaModelName } from "../helpers/toPrismaModelName";

export const generateDatasourceImpl = (
  model: PrismaModel
) => {

  const upperModel =
    upperCaseFirst(model.name);

  const lowerModel =
    lowercaseFirst(model.name);

  const pluralModel =
    pluralize(upperModel);

  const prismaModel =
    toPrismaModelName(model.name);

  const editableFields = model.fields
    .filter((field) =>
      isScalarType(field.type)
    )
    .filter(
      (field) =>
        ![
          "id",
          "createdAt",
          "updatedAt",
        ].includes(field.name)
    );

  const dtoDestructuring =
    editableFields
      .map((field) => field.name)
      .join(", ");

  const updateData =
    editableFields
      .map((field) => {
        return `                ${field.name}: ${field.name} ?? undefined,`;
      })
      .join("\n");

  return `import { ${upperModel}Datasource } from '../../../domain/datasources/${lowerModel}/${lowerModel}.datasource';
import { Search${upperModel}QueryParamsDto } from '../../../domain/dto/${lowerModel}/search${upperModel}Query.dto';
import { Update${upperModel}Dto } from '../../../domain/dto/${lowerModel}/update${upperModel}.dto';
import { ${pluralModel}Entity } from '../../../domain/entities';
import { prisma } from '../../../data/database';
import { AppCustomError } from '../../../domain/errors/AppCustom.error';
import ${pluralModel}Mapper from '../../../domain/mappers/${lowerModel}/${pluralModel.toLowerCase()}.mapper';

export class ${upperModel}DatasourceImplementation implements ${upperModel}Datasource {

    async get${upperModel}ById(id: string): Promise<${pluralModel}Entity> {

        const existing${upperModel} =
            await prisma.${prismaModel}.findUnique({
                where:{
                    id: id,
                }
            })

        if(!existing${upperModel}) {
            throw AppCustomError.badRequest(
                'No ${lowerModel} found'
            )
        }

        return ${pluralModel}Mapper.prismaToEntity(
            existing${upperModel}
        )
    }

    async get${pluralModel}(
        queryParams: Search${upperModel}QueryParamsDto
    ): Promise<[${pluralModel}Entity[], number]> {

        const { page, limit } = queryParams

        const ${lowerModel}Count =
            prisma.${prismaModel}.count()

        const ${lowerModel}Found =
            prisma.${prismaModel}.findMany({
                take: Number(limit),
                skip: (
                    (Number(page) - 1) *
                    Number(limit)
                )
            })

        const [total, ${pluralModel.toLowerCase()}] =
            await Promise.all([
                ${lowerModel}Count,
                ${lowerModel}Found
            ])

        const ${lowerModel}Entities =
            ${pluralModel.toLowerCase()}.map(
                (${lowerModel}) =>
                    ${pluralModel}Mapper.prismaToEntity(
                        ${lowerModel}
                    )
            )

        return [
            ${lowerModel}Entities,
            total
        ]
    }

    async update${upperModel}(
        dto: Update${upperModel}Dto,
        id: string
    ): Promise<${pluralModel}Entity> {

        const existing${upperModel} =
            await prisma.${prismaModel}.findFirst({
                where:{ id }
            })

        if(!existing${upperModel}) {
            throw AppCustomError.notFound(
                '${upperModel} not found'
            )
        }

        const {
            ${dtoDestructuring}
        } = dto

        const updated${upperModel} =
            await prisma.${prismaModel}.update({
                where:{ id },
                data:{
${updateData}
                }
            })

        return ${pluralModel}Mapper.prismaToEntity(
            updated${upperModel}
        )
    }

    async delete${upperModel}(
        id: string
    ): Promise<string> {

        const existing${upperModel} =
            await prisma.${prismaModel}.findFirst({
                where:{ id }
            })

        if(!existing${upperModel}) {
            throw AppCustomError.notFound(
                '${upperModel} not found'
            )
        }

        await prisma.${prismaModel}.delete({
            where:{ id }
        })

        return '${upperModel} deleted successfully'
    }
}
`;
};
import { upperCaseFirst } from "../helpers/upperCaseFirst";
import { PrismaModel } from "../generate-crud.types";
import { lowercaseFirst } from "../helpers/lowerCaseFirst";
import { isScalarType } from "../generate-crud.constants";
import { toPrismaModelName } from "../helpers/toPrismaModelName";

export const generateDatasourceImpl = (model: PrismaModel) => {
  const upperModel = upperCaseFirst(model.name);

  const lowerModel = lowercaseFirst(model.name);

  const prismaModel = toPrismaModelName(model.name);

  const editableFields = model.fields
    .filter((field) => isScalarType(field.type))
    .filter((field) => !["id", "createdAt", "updatedAt"].includes(field.name));

  const dtoDestructuring = editableFields.map((field) => field.name).join(", ");

  const updateData = editableFields
    .map((field) => {
      return `        if (${field.name} !== undefined) data.${field.name} = ${field.name}`;
    })
    .join("\n");

  const createData = editableFields
    .map((field) => {
      return `                ${field.name}: ${field.name},`;
    })
    .join("\n");

  return `import { ${upperModel}Datasource } from '../../../domain/datasources/${lowerModel}/${lowerModel}.datasource';
import { Search${upperModel}QueryParamsDto } from '../../../domain/dto/${lowerModel}/search${upperModel}Query.dto';
import { Update${upperModel}Dto } from '../../../domain/dto/${lowerModel}/update${upperModel}.dto';
import { Create${upperModel}Dto } from '../../../domain/dto/${lowerModel}/create${upperModel}.dto';
import { ${upperModel}Entity } from '../../../domain/entities';
import { prisma } from '../../../data/database';
import { AppCustomError } from '../../../domain/errors/AppCustom.error';
import { ${upperModel}Mapper } from '../../../domain/mappers';

export class ${upperModel}DatasourceImplementation implements ${upperModel}Datasource {

    async get${upperModel}ById(id: string): Promise<${upperModel}Entity> {

        const existing${upperModel} =
            await prisma.${prismaModel}.findUnique({
                where:{
                    id: Number(id),
                }
            })

        if(!existing${upperModel}) {
            throw AppCustomError.badRequest(
                'No ${lowerModel} found'
            )
        }

        return ${upperModel}Mapper.prismaToEntity(
            existing${upperModel}
        )
    }

    async create${upperModel}(
      dto: Create${upperModel}Dto,
    ): Promise<${upperModel}Entity> {
      const {
        ${dtoDestructuring}
      } = dto
      
      const ${model.name} = await prisma.${model.name}.create({
        data:{
          ${createData}
        }
      })
  
      const ${model.name}Entity = ${upperModel}Mapper.prismaToEntity(${model.name})
      return ${model.name}Entity
    }

    async get${upperModel}(
        queryParams: Search${upperModel}QueryParamsDto
    ): Promise<[${upperModel}Entity[], number]> {

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

        const [total, ${model.name.toLowerCase()}] =
            await Promise.all([
                ${lowerModel}Count,
                ${lowerModel}Found
            ])

        const ${lowerModel}Entities =
            ${model.name.toLowerCase()}.map(
                (${lowerModel}) =>
                    ${upperModel}Mapper.prismaToEntity(
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
    ): Promise<${upperModel}Entity> {

        const existing${upperModel} =
            await prisma.${prismaModel}.findFirst({
                where:{ id:Number(id) }
            })

        if(!existing${upperModel}) {
            throw AppCustomError.notFound(
                '${upperModel} not found'
            )
        }

        const {
            ${dtoDestructuring}
        } = dto

        let data:any = {}

        ${updateData}

        const updated${upperModel} =
            await prisma.${prismaModel}.update({
                where:{ id: Number(id) },
                data
            })

        return ${upperModel}Mapper.prismaToEntity(
            updated${upperModel}
        )
    }

    async delete${upperModel}(
        id: string
    ): Promise<string> {

        const existing${upperModel} =
            await prisma.${prismaModel}.findFirst({
                where:{ id:Number(id) }
            })

        if(!existing${upperModel}) {
            throw AppCustomError.notFound(
                '${upperModel} not found'
            )
        }

        await prisma.${prismaModel}.delete({
            where:{ id:Number(id) }
        })

        return '${upperModel} deleted successfully'
    }
}
`;
};

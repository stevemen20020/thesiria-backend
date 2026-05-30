import { StructuresDatasource } from '../../../domain/datasources/structures/structures.datasource';
import { SearchStructuresQueryParamsDto } from '../../../domain/dto/structures/searchStructuresQuery.dto';
import { UpdateStructuresDto } from '../../../domain/dto/structures/updateStructures.dto';
import { CreateStructuresDto } from '../../../domain/dto/structures/createStructures.dto';
import { StructuresEntity } from '../../../domain/entities';
import { prisma } from '../../../data/database';
import { AppCustomError } from '../../../domain/errors/AppCustom.error';
import { StructuresMapper } from '../../../domain/mappers';

export class StructuresDatasourceImplementation implements StructuresDatasource {

    async getStructuresById(id: string): Promise<StructuresEntity> {

        const existingStructures =
            await prisma.structures.findUnique({
                where:{
                    id: Number(id),
                }
            })

        if(!existingStructures) {
            throw AppCustomError.badRequest(
                'No structures found'
            )
        }

        return StructuresMapper.prismaToEntity(
            existingStructures
        )
    }

    async createStructures(
      dto: CreateStructuresDto,
    ): Promise<StructuresEntity> {
      const {
        name, description, difficulty, location_id
      } = dto
      
      const structures = await prisma.structures.create({
        data:{
            name: name,
            description: description,
            difficulty: Number(difficulty),
            location_id: Number(location_id),
        }
      })
  
      const structuresEntity = StructuresMapper.prismaToEntity(structures)
      return structuresEntity
    }

    async getStructures(
        queryParams: SearchStructuresQueryParamsDto
    ): Promise<[StructuresEntity[], number]> {

        const { page, limit } = queryParams

        const structuresCount =
            prisma.structures.count()

        const structuresFound =
            prisma.structures.findMany({
                take: Number(limit),
                skip: (
                    (Number(page) - 1) *
                    Number(limit)
                )
            })

        const [total, structures] =
            await Promise.all([
                structuresCount,
                structuresFound
            ])

        const structuresEntities =
            structures.map(
                (structures) =>
                    StructuresMapper.prismaToEntity(
                        structures
                    )
            )

        return [
            structuresEntities,
            total
        ]
    }

    async updateStructures(
        dto: UpdateStructuresDto,
        id: string
    ): Promise<StructuresEntity> {

        const existingStructures =
            await prisma.structures.findFirst({
                where:{ id:Number(id) }
            })

        if(!existingStructures) {
            throw AppCustomError.notFound(
                'Structures not found'
            )
        }

        const {
            name, description, difficulty, location_id
        } = dto

        let data:any = {}

        if (name !== undefined) data.name = name
        if (description !== undefined) data.description = description
        if (difficulty !== undefined) data.difficulty = difficulty
        if (location_id !== undefined) data.location_id = location_id

        const updatedStructures =
            await prisma.structures.update({
                where:{ id: Number(id) },
                data
            })

        return StructuresMapper.prismaToEntity(
            updatedStructures
        )
    }

    async deleteStructures(
        id: string
    ): Promise<string> {

        const existingStructures =
            await prisma.structures.findFirst({
                where:{ id:Number(id) }
            })

        if(!existingStructures) {
            throw AppCustomError.notFound(
                'Structures not found'
            )
        }

        await prisma.structures.delete({
            where:{ id:Number(id) }
        })

        return 'Structures deleted successfully'
    }
}

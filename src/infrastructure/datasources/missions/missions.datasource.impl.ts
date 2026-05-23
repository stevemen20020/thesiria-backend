import { MissionsDatasource } from '../../../domain/datasources/missions/missions.datasource';
import { SearchMissionsQueryParamsDto } from '../../../domain/dto/missions/searchMissionsQuery.dto';
import { UpdateMissionsDto } from '../../../domain/dto/missions/updateMissions.dto';
import { CreateMissionsDto } from '../../../domain/dto/missions/createMissions.dto';
import { MissionsEntity } from '../../../domain/entities';
import { prisma } from '../../../data/database';
import { AppCustomError } from '../../../domain/errors/AppCustom.error';
import { MissionsMapper } from '../../../domain/mappers';

export class MissionsDatasourceImplementation implements MissionsDatasource {

    async getMissionsById(id: string): Promise<MissionsEntity> {

        const existingMissions =
            await prisma.missions.findUnique({
                where:{
                    id: Number(id),
                }
            })

        if(!existingMissions) {
            throw AppCustomError.badRequest(
                'No missions found'
            )
        }

        return MissionsMapper.prismaToEntity(
            existingMissions
        )
    }

    async createMissions(
      dto: CreateMissionsDto,
    ): Promise<MissionsEntity> {
      const {
        giver_npc_id, name, description
      } = dto
      
      const missions = await prisma.missions.create({
        data:{
                giver_npc_id: Number(giver_npc_id),
                name: name,
                description: description,
        }
      })
  
      const missionsEntity = MissionsMapper.prismaToEntity(missions)
      return missionsEntity
    }

    async getMissions(
        queryParams: SearchMissionsQueryParamsDto
    ): Promise<[MissionsEntity[], number]> {

        const { page, limit } = queryParams

        const missionsCount =
            prisma.missions.count()

        const missionsFound =
            prisma.missions.findMany({
                take: Number(limit),
                skip: (
                    (Number(page) - 1) *
                    Number(limit)
                )
            })

        const [total, missions] =
            await Promise.all([
                missionsCount,
                missionsFound
            ])

        const missionsEntities =
            missions.map(
                (missions) =>
                    MissionsMapper.prismaToEntity(
                        missions
                    )
            )

        return [
            missionsEntities,
            total
        ]
    }

    async updateMissions(
        dto: UpdateMissionsDto,
        id: string
    ): Promise<MissionsEntity> {

        const existingMissions =
            await prisma.missions.findFirst({
                where:{ id:Number(id) }
            })

        if(!existingMissions) {
            throw AppCustomError.notFound(
                'Missions not found'
            )
        }

        const {
            giver_npc_id, name, description
        } = dto

        let data:any = {}

                if (giver_npc_id !== undefined) data.giver_npc_id = giver_npc_id
        if (name !== undefined) data.name = name
        if (description !== undefined) data.description = description

        const updatedMissions =
            await prisma.missions.update({
                where:{ id: Number(id) },
                data
            })

        return MissionsMapper.prismaToEntity(
            updatedMissions
        )
    }

    async deleteMissions(
        id: string
    ): Promise<string> {

        const existingMissions =
            await prisma.missions.findFirst({
                where:{ id:Number(id) }
            })

        if(!existingMissions) {
            throw AppCustomError.notFound(
                'Missions not found'
            )
        }

        await prisma.missions.delete({
            where:{ id:Number(id) }
        })

        return 'Missions deleted successfully'
    }
}

import { RacesDatasource } from '../../../domain/datasources/races/races.datasource';
import { SearchRacesQueryParamsDto } from '../../../domain/dto/races/searchRacesQuery.dto';
import { UpdateRacesDto } from '../../../domain/dto/races/updateRaces.dto';
import { RacesesEntity } from '../../../domain/entities';
import { prisma } from '../../../data/database';
import { AppCustomError } from '../../../domain/errors/AppCustom.error';
import RacesesMapper from '../../../domain/mappers/races/raceses.mapper';

export class RacesDatasourceImplementation implements RacesDatasource {

    async getRacesById(id: string): Promise<RacesesEntity> {

        const existingRaces =
            await prisma.races.findUnique({
                where:{
                    id: id,
                }
            })

        if(!existingRaces) {
            throw AppCustomError.badRequest(
                'No races found'
            )
        }

        return RacesesMapper.prismaToEntity(
            existingRaces
        )
    }

    async getRaceses(
        queryParams: SearchRacesQueryParamsDto
    ): Promise<[RacesesEntity[], number]> {

        const { page, limit } = queryParams

        const racesCount =
            prisma.races.count()

        const racesFound =
            prisma.races.findMany({
                take: Number(limit),
                skip: (
                    (Number(page) - 1) *
                    Number(limit)
                )
            })

        const [total, raceses] =
            await Promise.all([
                racesCount,
                racesFound
            ])

        const racesEntities =
            raceses.map(
                (races) =>
                    RacesesMapper.prismaToEntity(
                        races
                    )
            )

        return [
            racesEntities,
            total
        ]
    }

    async updateRaces(
        dto: UpdateRacesDto,
        id: string
    ): Promise<RacesesEntity> {

        const existingRaces =
            await prisma.races.findFirst({
                where:{ id }
            })

        if(!existingRaces) {
            throw AppCustomError.notFound(
                'Races not found'
            )
        }

        const {
            race, strength_bonus, dexterity_bonus, defense_bonus, aim_bonus, vision_bonus, speed_bonus, handcraft_bonus, agility_bonus, charisma_bonus, wisdom_bonus
        } = dto

        const updatedRaces =
            await prisma.races.update({
                where:{ id },
                data:{
                race: race ?? undefined,
                strength_bonus: strength_bonus ?? undefined,
                dexterity_bonus: dexterity_bonus ?? undefined,
                defense_bonus: defense_bonus ?? undefined,
                aim_bonus: aim_bonus ?? undefined,
                vision_bonus: vision_bonus ?? undefined,
                speed_bonus: speed_bonus ?? undefined,
                handcraft_bonus: handcraft_bonus ?? undefined,
                agility_bonus: agility_bonus ?? undefined,
                charisma_bonus: charisma_bonus ?? undefined,
                wisdom_bonus: wisdom_bonus ?? undefined,
                }
            })

        return RacesesMapper.prismaToEntity(
            updatedRaces
        )
    }

    async deleteRaces(
        id: string
    ): Promise<string> {

        const existingRaces =
            await prisma.races.findFirst({
                where:{ id }
            })

        if(!existingRaces) {
            throw AppCustomError.notFound(
                'Races not found'
            )
        }

        await prisma.races.delete({
            where:{ id }
        })

        return 'Races deleted successfully'
    }
}

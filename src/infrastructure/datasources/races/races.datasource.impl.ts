import { SearchRacesQueryParamsDto } from "../../../domain/dto/races/searchRacesQuery.dto";
import { UpdateRacesDto } from "../../../domain/dto/races/updateRaces.dto";

import { prisma } from "../../../data/database";
import { AppCustomError } from "../../../domain/errors/AppCustom.error";
import { RacesMapper } from "../../../domain/mappers";
import { RacesEntity } from "../../../domain/entities";
import { racesDatasource } from "../../../domain/datasources/races/races.datasource";
import { CreateRacesDto } from "../../../domain/dto/races/createRaces.dto";

export class RacesDatasourceImplementation implements racesDatasource {
  async getRacesById(id: string): Promise<RacesEntity> {
    const existingRaces = await prisma.races.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!existingRaces) {
      throw AppCustomError.badRequest("No races found");
    }

    return RacesMapper.prismaToEntity(existingRaces);
  }

  async createRaces(dto: CreateRacesDto): Promise<RacesEntity> {
    const {
      race,
      strengthBonus,
      dexterityBonus,
      defenseBonus,
      aimBonus,
      visionBonus,
      speedBonus,
      handcraftBonus,
      agilityBonus,
      charismaBonus,
      wisdomBonus,
    } = dto;

    const affinity = await prisma.races.create({
      data: {
        race,
        strength_bonus: Number(strengthBonus),
        dexterity_bonus: Number(dexterityBonus),
        defense_bonus: Number(defenseBonus),
        aim_bonus: Number(aimBonus),
        vision_bonus: Number(visionBonus),
        speed_bonus: Number(speedBonus),
        handcraft_bonus: Number(handcraftBonus),
        agility_bonus: Number(agilityBonus),
        charisma_bonus: Number(charismaBonus),
        wisdom_bonus: Number(wisdomBonus),
      },
    });

    const affinityEntity = RacesMapper.prismaToEntity(affinity);
    return affinityEntity;
  }

  async getRaces(
    queryParams: SearchRacesQueryParamsDto,
  ): Promise<[RacesEntity[], number]> {
    const { page, limit } = queryParams;

    const racesCount = prisma.races.count();

    const racesFound = prisma.races.findMany({
      take: Number(limit),
      skip: (Number(page) - 1) * Number(limit),
    });

    const [total, raceses] = await Promise.all([racesCount, racesFound]);

    const racesEntities = raceses.map((races) =>
      RacesMapper.prismaToEntity(races),
    );

    return [racesEntities, total];
  }

  async updateRaces(dto: UpdateRacesDto, id: string): Promise<RacesEntity> {
    const existingRaces = await prisma.races.findFirst({
      where: { id: Number(id) },
    });

    if (!existingRaces) {
      throw AppCustomError.notFound("Races not found");
    }

    const {
      race,
      strengthBonus,
      dexterityBonus,
      defenseBonus,
      aimBonus,
      visionBonus,
      speedBonus,
      handcraftBonus,
      agilityBonus,
      charismaBonus,
      wisdomBonus,
    } = dto;

    let data: any = {};

    if (race) data.race = race;
    if (strengthBonus) data.strength_bonus = Number(strengthBonus);
    if (dexterityBonus) data.dexterity_bonus = Number(dexterityBonus);
    if (defenseBonus) data.defense_bonus = Number(defenseBonus);
    if (aimBonus) data.aim_bonus = Number(aimBonus);
    if (visionBonus) data.vision_bonus = Number(visionBonus);
    if (speedBonus) data.speed_bonus = Number(speedBonus);
    if (handcraftBonus) data.handcraft_bonus = Number(handcraftBonus);
    if (agilityBonus) data.agility_bonus = Number(agilityBonus);
    if (charismaBonus) data.charisma_bonus = Number(charismaBonus);
    if (wisdomBonus) data.wisdom_bonus = Number(wisdomBonus);

    const updatedRaces = await prisma.races.update({
      where: { id: Number(id) },
      data: data,
    });

    return RacesMapper.prismaToEntity(updatedRaces);
  }

  async deleteRaces(id: string): Promise<string> {
    const existingRaces = await prisma.races.findFirst({
      where: { id: Number(id) },
    });

    if (!existingRaces) {
      throw AppCustomError.notFound("Races not found");
    }

    await prisma.races.delete({
      where: { id: Number(id) },
    });

    return "Races deleted successfully";
  }
}

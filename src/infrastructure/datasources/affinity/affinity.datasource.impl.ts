import { SearchAffinityQueryParamsDto } from "../../../domain/dto/affinity/searchAffinityQuery.dto";
import { UpdateAffinityDto } from "../../../domain/dto/affinity/updateAffinity.dto";
import { prisma } from "../../../data/database";
import { AppCustomError } from "../../../domain/errors/AppCustom.error";
import { affinityDatasource } from "../../../domain/datasources/affinity/affinity.datasource";
import { AffinityEntity } from "../../../domain/entities";
import { AffinityMapper } from "../../../domain/mappers";
import { CreateAffinityDto } from "../../../domain/dto/affinity/createAffinity.dto";

export class AffinityDatasourceImplementation implements affinityDatasource {
  async getAffinityById(id: string): Promise<AffinityEntity> {
    const existingAffinity = await prisma.affinity.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        elements: true,
      },
    });

    if (!existingAffinity) {
      throw AppCustomError.badRequest("No affinity found");
    }

    return AffinityMapper.prismaToEntity(existingAffinity);
  }

  async getAffinities(
    queryParams: SearchAffinityQueryParamsDto,
  ): Promise<[AffinityEntity[], number]> {
    const { page, limit } = queryParams;

    const affinityCount = prisma.affinity.count();

    const affinityFound = prisma.affinity.findMany({
      take: Number(limit),
      skip: (Number(page) - 1) * Number(limit),
      include: { elements: true },
    });

    const [total, affinities] = await Promise.all([
      affinityCount,
      affinityFound,
    ]);

    const affinityEntities = affinities.map((affinity) =>
      AffinityMapper.prismaToEntity(affinity),
    );

    return [affinityEntities, total];
  }

  async updateAffinity(
    dto: UpdateAffinityDto,
    id: string,
  ): Promise<AffinityEntity> {
    const existingAffinity = await prisma.affinity.findFirst({
      where: { id: Number(id) },
    });

    if (!existingAffinity) {
      throw AppCustomError.notFound("Affinity not found");
    }

    const { name, elementId, bonus, color } = dto;

    let data:any = {}

    if(name) data.name = name
    if(elementId) data.element_id = Number(elementId)
    if(bonus) data.bonus = Number(bonus)
    if(color) data.color = color

    const updatedAffinity = await prisma.affinity.update({
      where: { id: Number(id) },
      data,
      include: {
        elements: true,
      },
    });

    return AffinityMapper.prismaToEntity(updatedAffinity);
  }

  async createAffinity(
    dto: CreateAffinityDto,
  ): Promise<AffinityEntity> {
    const { name, elementId, bonus, color } = dto
    
    const affinity = await prisma.affinity.create({
        data:{
          name,
          element_id: Number(elementId),
          bonus: Number(bonus),
          color
        }, include:{
          elements:true
        }
    })

    const affinityEntity = AffinityMapper.prismaToEntity(affinity)
    return affinityEntity
  }

  async deleteAffinity(id: string): Promise<string> {
    const existingAffinity = await prisma.affinity.findFirst({
      where: { id: Number(id) },
    });

    if (!existingAffinity) {
      throw AppCustomError.notFound("Affinity not found");
    }

    await prisma.affinity.delete({
      where: { id: Number(id) },
    });

    return "Affinity deleted successfully";
  }
}

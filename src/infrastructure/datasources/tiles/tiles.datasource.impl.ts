import { TilesDatasource } from "../../../domain/datasources/tiles/tiles.datasource";
import { SearchTilesQueryParamsDto } from "../../../domain/dto/tiles/searchTilesQuery.dto";
import { UpdateTilesDto } from "../../../domain/dto/tiles/updateTiles.dto";
import { CreateTilesDto } from "../../../domain/dto/tiles/createTiles.dto";
import { TilesEntity } from "../../../domain/entities";
import { prisma } from "../../../data/database";
import { AppCustomError } from "../../../domain/errors/AppCustom.error";
import { TilesMapper } from "../../../domain/mappers";

export class TilesDatasourceImplementation implements TilesDatasource {
  async getTilesById(id: string): Promise<TilesEntity> {
    const existingTiles = await prisma.tiles.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!existingTiles) {
      throw AppCustomError.badRequest("No tiles found");
    }

    return TilesMapper.prismaToEntity(existingTiles);
  }

  async createTiles(dto: CreateTilesDto): Promise<TilesEntity> {
    const { name, image, structure_id, image_public_id } = dto;

    const tiles = await prisma.tiles.create({
      data: {
        name: name,
        image: image,
        structure_id: Number(structure_id),
        image_public_id: image_public_id,
      },
    });

    const tilesEntity = TilesMapper.prismaToEntity(tiles);
    return tilesEntity;
  }

  async getTiles(
    queryParams: SearchTilesQueryParamsDto,
  ): Promise<[TilesEntity[], number]> {
    const { page, limit } = queryParams;

    const tilesCount = prisma.tiles.count();

    const tilesFound = prisma.tiles.findMany({
      take: Number(limit),
      skip: (Number(page) - 1) * Number(limit),
    });

    const [total, tiles] = await Promise.all([tilesCount, tilesFound]);

    const tilesEntities = tiles.map((tiles) =>
      TilesMapper.prismaToEntity(tiles),
    );

    return [tilesEntities, total];
  }

  async updateTiles(dto: UpdateTilesDto, id: string): Promise<TilesEntity> {
    const existingTiles = await prisma.tiles.findFirst({
      where: { id: Number(id) },
    });

    if (!existingTiles) {
      throw AppCustomError.notFound("Tiles not found");
    }

    const { name, image, structure_id } = dto;

    let data: any = {};

    if (name !== undefined) data.name = name;
    if (image !== undefined) data.image = image;
    if (structure_id !== undefined) data.structure_id = Number(structure_id);

    const updatedTiles = await prisma.tiles.update({
      where: { id: Number(id) },
      data,
    });

    return TilesMapper.prismaToEntity(updatedTiles);
  }

  async deleteTiles(id: string): Promise<string> {
    const existingTiles = await prisma.tiles.findFirst({
      where: { id: Number(id) },
    });

    if (!existingTiles) {
      throw AppCustomError.notFound("Tiles not found");
    }

    await prisma.tiles.delete({
      where: { id: Number(id) },
    });

    return "Tiles deleted successfully";
  }
}

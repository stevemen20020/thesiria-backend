import { TilesRepository } from "../../../domain/repositories/tiles/tiles.repository";
import { TilesDatasource } from "../../../domain/datasources/tiles/tiles.datasource";
import { TilesEntity } from "../../../domain/entities";
import { SearchTilesQueryParamsDto } from "../../../domain/dto/tiles/searchTilesQuery.dto";
import { UpdateTilesDto } from "../../../domain/dto/tiles/updateTiles.dto";
import { CreateTilesDto } from "../../../domain/dto/tiles/createTiles.dto";

export class TilesRepositoryImplementation implements TilesRepository {

    constructor(
        private readonly datasource: TilesDatasource
    ){}

    getTilesById(
        id: string
    ): Promise<TilesEntity> {

        return this.datasource.getTilesById(id)
    }

    getTiles(
        queryParams: SearchTilesQueryParamsDto
    ): Promise<[TilesEntity[], number]> {

        return this.datasource.getTiles(queryParams)
    }

    updateTiles(
        dto: UpdateTilesDto,
        id: string
    ): Promise<TilesEntity> {

        return this.datasource.updateTiles(dto, id)
    }

    createTiles(
        dto: CreateTilesDto
    ): Promise<TilesEntity> {

        return this.datasource.createTiles(dto)
    }

    deleteTiles(
        id: string
    ): Promise<string> {

        return this.datasource.deleteTiles(id)
    }
}

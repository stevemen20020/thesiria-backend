import { SearchTilesQueryParamsDto } from "../../dto/tiles/searchTilesQuery.dto";
import { UpdateTilesDto } from "../../dto/tiles/updateTiles.dto";
import { CreateTilesDto } from "../../dto/tiles/createTiles.dto";
import { TilesEntity } from "../../entities";

export interface TilesDatasource {
    getTilesById(id: string) :Promise<TilesEntity>;
    getTiles(queryParams: SearchTilesQueryParamsDto): Promise<[TilesEntity[], number]>
    updateTiles(dto: UpdateTilesDto, id:string): Promise<TilesEntity>
    deleteTiles(id:string): Promise<string>
    createTiles(dto: CreateTilesDto): Promise<TilesEntity>
}

import { structures_type } from "../../enums";
import { TilesEntity } from "../tiles/tiles.entity";
export interface StructuresEntity {
  id: string;
  name: string;
  description: string;
  difficulty: string;
  locationId?: string;
  type?: structures_type;
  tilesStructuresLocationIdTotiles?: TilesEntity;
  tilesTilesStructureIdTostructures?: TilesEntity[];
}

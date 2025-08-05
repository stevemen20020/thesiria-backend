import { structures_type } from "../../enums";
import { TilesEntity } from "../tiles/tiles.entity";
import { TilesEntity } from "../tiles/tiles.entity";
export interface StructuresEntity {
  id: number;
  name: string;
  description: string;
  difficulty: number;
  location_id?: number;
  type?: structures_type;
  tiles_structures_location_idTotiles?: TilesEntity;
  tiles_tiles_structure_idTostructures?: TilesEntity[];
}

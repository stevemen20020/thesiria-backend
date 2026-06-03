export interface ServerToClientEvents {
  map_changed: (data: {
    mapId: string;
  }) => void;
}

export interface ClientToServerEvents {

}
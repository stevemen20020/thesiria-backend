import { SocketServer } from "../socket";

export class MapEvents {
  static emitMapChanged(
    mapId: string
  ) {
    SocketServer.getIO()
      .emit("map_changed", {
        mapId,
      });
  }
}
import { Server as HttpServer } from "http";

import { Server, Socket } from "socket.io";

import { ClientToServerEvents, ServerToClientEvents } from "./types";
import { SessionStateStore } from "./state/session.state";

export class SocketServer {
  private static io: Server<ClientToServerEvents, ServerToClientEvents>;

  static initialize(httpServer: HttpServer) {
    this.io = new Server<ClientToServerEvents, ServerToClientEvents>(
      httpServer,
      {
        cors: {
          origin: "*",
        },
      },
    );

    this.io.on("connection", (socket) => {
      console.log(`Connected ${socket.id}`);

      const activeMapId =
        SessionStateStore.getActiveMapId();

        console.log('MAPID',activeMapId)

      if (activeMapId) {
        socket.emit("map_changed", {
          mapId: activeMapId,
        });
      }
    });
  }

  static getIO() {
    if (!this.io) {
      throw new Error("Socket.io not initialized");
    }

    return this.io;
  }
}

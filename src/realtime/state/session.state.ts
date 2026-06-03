interface SessionState {
  activeMapId: string | null;
}

export class SessionStateStore {
  private static state: SessionState = {
    activeMapId: "1",
  };

  static getActiveMapId() {
    return this.state.activeMapId;
  }

  static setActiveMapId(mapId: string) {
    this.state.activeMapId = mapId;
  }
}
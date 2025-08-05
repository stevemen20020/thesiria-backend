export interface TalismanesEntity {
  id: number;
  name: string;
  description: string;
  type: number;
  cooldown?: number;
  discovered: number;
}

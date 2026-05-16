import { z } from "zod";

export const createPlayableCharacterSchema = z.object({
  userId: z.string().min(1),
  name: z.string().min(3),
  biography: z.string().min(3).optional(),
  idRace: z.string().min(1),
  positiveCharacteristic_1: z.string().min(5).optional(),
  positiveCharacteristic_2: z.string().min(5).optional(),
  positiveCharacteristic_3: z.string().min(5).optional(),
  negativeCharacteristic_1: z.string().min(5).optional(),
  negativeCharacteristic_2: z.string().min(5).optional(),
  strength: z.string().min(1).max(2),
  dexterity: z.string().min(1).max(2),
  defense: z.string().min(1).max(2),
  aim: z.string().min(1).max(2),
  vision: z.string().min(1).max(2),
  speed: z.string().min(1).max(2),
  handcraft: z.string().min(1).max(2),
  agility: z.string().min(1).max(2),
  charisma: z.string().min(1).max(2),
  wisdom: z.string().min(1).max(2),
  affinityId: z.string().min(1),
  chroniclerStatus: z.string().min(1).max(1),
  imageReference: z.string().min(5).optional(),
  money: z.string().min(1),
  health: z.string().min(1),
  maxHealth: z.string().min(1),
  activeMaxHealth: z.string().min(1),
});

export type CreatePlayableCharacterDto = z.infer<
  typeof createPlayableCharacterSchema
>;

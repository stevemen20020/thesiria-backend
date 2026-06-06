import { z } from "zod";

export const createPlayableCharacterSchema = z.object({
  userId: z.string().optional(),
  name: z.string().min(3),
  biography: z.string().optional(),
  idRace: z.string().min(1),
  positiveCharacteristic_1: z.string().min(5),
  positiveCharacteristic_2: z.string().min(5),
  positiveCharacteristic_3: z.string().min(5),
  negativeCharacteristic_1: z.string().min(5),
  negativeCharacteristic_2: z.string().min(5),
  strength: z.number().min(1).max(20),
  dexterity: z.number().min(1).max(20),
  defense: z.number().min(1).max(20),
  aim: z.number().min(1).max(20),
  vision: z.number().min(1).max(20),
  speed: z.number().min(1).max(20),
  handcraft: z.number().min(1).max(20),
  agility: z.number().min(1).max(20),
  charisma: z.number().min(1).max(20),
  wisdom: z.number().min(1).max(20),
  affinityId: z.string().min(1),
  chroniclerStatus: z.string().default("1"),
  imageReference: z.string().optional(),
  money: z.string().default("0"),
  health: z.string().default("500"),
  maxHealth: z.string().default("500"),
  activeMaxHealth: z.string().default("500"),
});

export type CreatePlayableCharacterDto = z.infer<
  typeof createPlayableCharacterSchema
>;

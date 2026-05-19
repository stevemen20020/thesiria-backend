import { z } from 'zod'

export const createRacesSchema = z.object({
    race: z.string(),
    strength_bonus: z.string(),
    dexterity_bonus: z.string(),
    defense_bonus: z.string(),
    aim_bonus: z.string(),
    vision_bonus: z.string(),
    speed_bonus: z.string(),
    handcraft_bonus: z.string(),
    agility_bonus: z.string(),
    charisma_bonus: z.string(),
    wisdom_bonus: z.string(),
})

export type CreateRacesDto = z.infer<typeof createRacesSchema>

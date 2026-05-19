import { z } from 'zod'

export const updateRacesSchema = z.object({
    race: z.string().optional(),
    strength_bonus: z.string().optional(),
    dexterity_bonus: z.string().optional(),
    defense_bonus: z.string().optional(),
    aim_bonus: z.string().optional(),
    vision_bonus: z.string().optional(),
    speed_bonus: z.string().optional(),
    handcraft_bonus: z.string().optional(),
    agility_bonus: z.string().optional(),
    charisma_bonus: z.string().optional(),
    wisdom_bonus: z.string().optional(),
})

export type UpdateRacesDto = z.infer<typeof updateRacesSchema>

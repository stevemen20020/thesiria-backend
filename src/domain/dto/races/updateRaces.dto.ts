import { z } from 'zod'

export const updateRacesSchema = z.object({
    race: z.string().optional(),
    strengthBonus: z.string().optional(),
    dexterityBonus: z.string().optional(),
    defenseBonus: z.string().optional(),
    aimBonus: z.string().optional(),
    visionBonus: z.string().optional(),
    speedBonus: z.string().optional(),
    handcraftBonus: z.string().optional(),
    agilityBonus: z.string().optional(),
    charismaBonus: z.string().optional(),
    wisdomBonus: z.string().optional(),
})

export type UpdateRacesDto = z.infer<typeof updateRacesSchema>

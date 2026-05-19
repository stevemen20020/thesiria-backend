import { z } from 'zod'

export const createRacesSchema = z.object({
    race: z.string(),
    strengthBonus: z.string(),
    dexterityBonus: z.string(),
    defenseBonus: z.string(),
    aimBonus: z.string(),
    visionBonus: z.string(),
    speedBonus: z.string(),
    handcraftBonus: z.string(),
    agilityBonus: z.string(),
    charismaBonus: z.string(),
    wisdomBonus: z.string(),
})

export type CreateRacesDto = z.infer<typeof createRacesSchema>

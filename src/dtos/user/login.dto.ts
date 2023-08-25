import z from 'zod'

export interface loginInputDTO {
    email: string, 
    password: string 
}

export interface loginOutputDTO {
    token: string
}

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(7) 
})
import z from 'zod'

export interface signupInputDTO {
    name: string, 
    email: string,
    password: string 
}

export interface signupOutputDTO {
    token: string
}

export const signupSchema = z.object({
    name: z.string().min(6),
    email: z.string().email(),
    password: z.string().min(7) 
})
